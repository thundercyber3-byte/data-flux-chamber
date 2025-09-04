import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ClientData {
  clients: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

interface RevenueChartProps {
  data: ClientData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map(item => ({
    name: item.clients,
    revenue: item.price,
    headshots: item.headshots,
    status: item.status
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border border-primary/30">
          <p className="text-primary font-semibold">{label}</p>
          <p className="text-accent">
            Revenue: ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
          <p className="text-secondary">
            Headshots: {payload[0].payload.headshots}
          </p>
          <p className="text-muted-foreground">
            Status: {payload[0].payload.status}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="revenue" 
            fill="url(#revenueGradient)"
            radius={[4, 4, 0, 0]}
            className="drop-shadow-lg"
          />
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.6} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}