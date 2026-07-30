import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/Card";

interface Stat {
  label: string;
  value: number | string;
}

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
  stats: Stat[];
}

export function DashboardPageHeader({
  title,
  description,
  action,
  stats,
}: DashboardPageHeaderProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark-brown">{title}</h1>
          <p className="text-dark-brown/60 mt-1">{description}</p>
        </div>
        {action}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent>
              <p className="text-sm text-dark-brown/60">{stat.label}</p>
              <p className="text-2xl font-bold text-dark-brown">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
