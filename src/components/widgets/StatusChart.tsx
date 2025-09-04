import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface ClientData {
  clients: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

interface StatusChartProps {
  data: ClientData[];
}

export function StatusChart({ data }: StatusChartProps) {
  const statusData = data.reduce((acc, item) => {
    const status = item.status;
    if (acc[status]) {
      acc[status] += 1;
    } else {
      acc[status] = 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(statusData).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: ((count / data.length) * 100).toFixed(1)
  }));

  const COLORS = {
    'Delivered': 'hsl(var(--accent))',
    'In Progress': 'hsl(var(--primary))',
    'Pending': 'hsl(var(--secondary))',
    'Cancelled': 'hsl(var(--destructive))'
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-card p-4 border border-secondary/30">
          <p className="text-secondary font-semibold">{data.name}</p>
          <p className="text-accent">Count: {data.value}</p>
          <p className="text-primary">Percentage: {data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[entry.name as keyof typeof COLORS] || 'hsl(var(--muted))'}
                className="drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {chartData.map((entry, index) => (
          <div key={entry.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] || 'hsl(var(--muted))' }}
            ></div>
            <span className="text-sm text-muted-foreground">{entry.name}</span>
            <span className="text-xs text-primary font-semibold">{entry.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}