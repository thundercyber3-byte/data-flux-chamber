import { Button } from '@/components/ui/button';
import { RefreshCw, Zap, Activity } from 'lucide-react';

interface DashboardHeaderProps {
  totalRevenue: number;
  onRefresh: () => void;
}

export function DashboardHeader({ totalRevenue, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="glass-card p-6 rounded-lg border border-glass-border/30">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-cyber">
              <Zap className="h-6 w-6 text-primary cyber-glow" />
            </div>
            <h1 className="text-3xl font-bold neon-text text-primary">
              Cyberpunk Analytics
            </h1>
          </div>
          <p className="text-muted-foreground">
            Real-time business intelligence dashboard powered by quantum data streams
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent">Live Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-foreground">₹{totalRevenue.toLocaleString('en-IN')} Total</span>
            </div>
          </div>
          
          <Button
            onClick={onRefresh}
            variant="outline"
            size="sm"
            className="glass-button"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Data
          </Button>
        </div>
      </div>
    </div>
  );
}