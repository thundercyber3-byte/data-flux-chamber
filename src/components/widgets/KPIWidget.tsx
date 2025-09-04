import { Card } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPIWidgetProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: number;
  color: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function KPIWidget({ title, value, icon: Icon, trend, color, className }: KPIWidgetProps) {
  const colorClasses = {
    primary: 'text-primary border-primary/30 shadow-glow-cyan',
    secondary: 'text-secondary border-secondary/30 shadow-glow-purple',
    accent: 'text-accent border-accent/30 shadow-glow-green'
  };

  const trendColor = trend && trend > 0 ? 'text-accent' : 'text-destructive';
  const TrendIcon = trend && trend > 0 ? TrendingUp : TrendingDown;

  return (
    <Card className={cn(
      'glass-card p-6 group hover:scale-105 transition-all duration-300 cyber-pulse',
      colorClasses[color],
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className={cn(
            'text-2xl font-bold neon-text',
            colorClasses[color].split(' ')[0]
          )}>
            {value}
          </p>
          {trend && (
            <div className={cn('flex items-center space-x-1 text-xs', trendColor)}>
              <TrendIcon className="h-3 w-3" />
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          'p-3 rounded-lg bg-gradient-cyber cyber-float',
          `border border-${color}/20`
        )}>
          <Icon className={cn('h-6 w-6', colorClasses[color].split(' ')[0])} />
        </div>
      </div>
      
      {/* Animated data stream */}
      <div className="mt-4 h-1 bg-muted/20 rounded-full overflow-hidden">
        <div className={cn(
          'h-full w-1/3 rounded-full animate-data-flow',
          `bg-${color}`
        )}></div>
      </div>
    </Card>
  );
}