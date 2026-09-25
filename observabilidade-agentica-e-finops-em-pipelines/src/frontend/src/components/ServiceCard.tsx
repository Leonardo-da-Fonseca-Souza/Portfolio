import React from 'react';
import { Badge } from './Badge';
import { StatusDot } from './StatusDot';

interface MetricItem {
  label: string;
  value: string | number;
}

interface ServiceCardProps {
  name: string;
  type: string;
  status: 'healthy' | 'warning' | 'error';
  metrics: MetricItem[];
  icon: React.ReactNode;
  accentColor: 'blue' | 'purple' | 'amber' | 'emerald';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  type,
  status,
  metrics,
  icon,
  accentColor,
}) => {
  const glowMap = {
    blue: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
    purple: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
    amber: 'hover:border-amber-500/40 hover:shadow-amber-500/10',
    emerald: 'hover:border-emerald-500/40 hover:shadow-emerald-500/10',
  };

  return (
    <div
      className={`glass-panel p-5 rounded-xl border border-slate-800/80 transition-all duration-300 shadow-md ${glowMap[accentColor]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-indigo-400">
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{name}</h3>
            <span className="text-xs text-slate-400 font-mono">{type}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={status === 'healthy' ? 'emerald' : 'amber'}>
            {status === 'healthy' ? 'Operacional' : 'Atenção'}
          </Badge>
          <StatusDot status={status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/60">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/40">
            <span className="block text-[10px] font-medium text-slate-400 uppercase tracking-wider">
              {m.label}
            </span>
            <span className="text-sm font-bold text-slate-100 mt-0.5 block font-mono">
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
