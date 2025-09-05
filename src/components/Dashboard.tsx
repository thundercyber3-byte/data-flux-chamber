import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { KPIWidget } from '@/components/widgets/KPIWidget';
import { RevenueChart } from '@/components/widgets/RevenueChart';
import { StatusChart } from '@/components/widgets/StatusChart';
import { ClientMetrics } from '@/components/widgets/ClientMetrics';
import { DashboardHeader } from '@/components/DashboardHeader';
import { ChatInterface } from '@/components/ChatInterface';
import { Activity, TrendingUp, Users, DollarSign, Target, Zap, MessageCircle } from 'lucide-react';

interface ClientData {
  clients: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

export function Dashboard() {
  const [data, setData] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://docs.google.com/spreadsheets/d/1MECiOFwIAVeo73EJbatTHL0VJptR4qhiPQgMxUiVfQw/export?format=csv'
      );
      const csvText = await response.text();
      
      const lines = csvText.split('\n').filter(line => line.trim());
      
      // Parse CSV properly handling quoted values
      const parsedData = lines.slice(1).map(line => {
        // Split by comma but respect quoted values
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
          const char = line[i];
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim()); // Add the last value
        
        return {
          clients: values[0]?.trim() || '',
          headshots: parseInt(values[1]) || 0,
          price: parseFloat(values[2]?.replace(/[₹,"\s]/g, '')) || 0, // Remove rupee symbol, commas, quotes, and spaces
          status: values[3]?.trim() || '',
          email: values[4]?.trim() || ''
        };
      }).filter(item => item.clients && item.clients !== '');

      console.log('Parsed data:', parsedData); // Debug log
      setData(parsedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = data.reduce((sum, item) => sum + item.price, 0);
  const totalClients = data.length;
  const totalHeadshots = data.reduce((sum, item) => sum + item.headshots, 0);
  const deliveredCount = data.filter(item => item.status === 'Delivered').length;
  const inProgressCount = data.filter(item => item.status === 'In Progress').length;
  const completionRate = totalClients > 0 ? (deliveredCount / totalClients) * 100 : 0;
  const avgOrderValue = totalClients > 0 ? totalRevenue / totalClients : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background cyber-grid">
        <div className="flex items-center justify-center min-h-screen">
          <div className="glass-card p-8 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-lg neon-text text-primary">Loading Dashboard...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background cyber-grid">
      <div className="container mx-auto p-6 space-y-6">
        <DashboardHeader totalRevenue={totalRevenue} onRefresh={fetchData} />
        
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <KPIWidget
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString('en-IN')}`}
            icon={DollarSign}
            trend={12.5}
            color="primary"
            className="xl:col-span-2"
          />
          <KPIWidget
            title="Total Clients"
            value={totalClients.toString()}
            icon={Users}
            trend={8.2}
            color="secondary"
          />
          <KPIWidget
            title="Total Headshots"
            value={totalHeadshots.toString()}
            icon={Activity}
            trend={15.3}
            color="accent"
          />
          <KPIWidget
            title="Completion Rate"
            value={`${completionRate.toFixed(1)}%`}
            icon={Target}
            trend={5.7}
            color="primary"
          />
          <KPIWidget
            title="Avg Order Value"
            value={`₹${avgOrderValue.toLocaleString('en-IN')}`}
            icon={TrendingUp}
            trend={-2.1}
            color="secondary"
            className="xl:col-span-2"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card className="glass-card p-6 xl:col-span-2">
            <h3 className="text-xl font-bold mb-6 neon-text text-primary">Revenue Analysis</h3>
            <RevenueChart data={data} />
          </Card>
          
          <Card className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6 neon-text text-secondary">Project Status</h3>
            <StatusChart data={data} />
          </Card>
        </div>

        {/* Client Metrics */}
        <Card className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 neon-text text-accent">Client Portfolio</h3>
          <ClientMetrics data={data} />
        </Card>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 neon-glow"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Modal */}
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}