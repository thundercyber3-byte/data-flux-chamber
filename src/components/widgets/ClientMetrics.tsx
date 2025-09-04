import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Camera, IndianRupee } from 'lucide-react';

interface ClientData {
  clients: string;
  headshots: number;
  price: number;
  status: string;
  email: string;
}

interface ClientMetricsProps {
  data: ClientData[];
}

export function ClientMetrics({ data }: ClientMetricsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'In Progress':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'Pending':
        return 'bg-secondary/20 text-secondary border-secondary/30';
      default:
        return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((client, index) => (
        <Card key={index} className="glass-card p-6 group hover:scale-105 transition-all duration-300">
          <div className="flex items-start space-x-4">
            <Avatar className="border-2 border-primary/30 cyber-pulse">
              <AvatarFallback className="bg-gradient-cyber text-primary font-bold">
                {getInitials(client.clients)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div>
                <h4 className="font-semibold text-foreground">{client.clients}</h4>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{client.email}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4 text-accent" />
                  <span className="text-accent font-medium">{client.headshots}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4 text-primary" />
                  <span className="text-primary font-medium">
                    ₹{client.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    client.status === 'Delivered' 
                      ? 'w-full bg-accent' 
                      : client.status === 'In Progress'
                      ? 'w-2/3 bg-primary'
                      : 'w-1/3 bg-secondary'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}