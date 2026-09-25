import React from 'react';
import { Sparkline } from './Sparkline';
import { StatusDot } from './StatusDot';
import { Badge } from './Badge';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  status?: 'healthy' | 'warning' | 'error';
  sparklineData?: number[];
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  subtext,
  status = 'healthy',
  sparklineData,
  icon,
}) => {
  const statusBorderMap = {
    healthy: 'border-slate-800 hover:border-slate-700',
    warning: 'border-amber-500/40 bg-amber-950/10',
    error: 'border-rose-500/50 bg-rose-950/20 animate-pulse',
  };

  const statusBadgeVariant = {
    healthy: 'emerald' as const,
    warning: 'amber' as const,
    error: 'rose' as const,
  };

  return (
    <div
      className={`glass-panel p-4 rounded-xl border transition-all duration-300 ${statusBorderMap[status]}`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {icon && <div className="text-indigo-400">{icon}</div>}
          <span className="text-xs font-medium text-slate-400">{title}</span>
        </div>
        <StatusDot status={status} />
      </div>

      <div className="flex items-baseline justify-between mt-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-white tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
        </div>
        {sparklineData && (
          <Sparkline
            data={sparklineData}
            color={status === 'warning' ? '#F59E0B' : status === 'error' ? '#F43F5E' : '#6366F1'}
          />
        )}
      </div>

      {subtext && (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">{subtext}</span>
          {status !== 'healthy' && (
            <Badge variant={statusBadgeVariant[status]}>
              {status === 'warning' ? 'Alerta' : 'Anomalia'}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
