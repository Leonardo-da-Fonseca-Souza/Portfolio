import React from 'react';

interface StatusDotProps {
  status: 'healthy' | 'warning' | 'error' | 'active';
  ping?: boolean;
}

export const StatusDot: React.FC<StatusDotProps> = ({ status, ping = true }) => {
  const colorMap = {
    healthy: 'bg-emerald-500',
    active: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
  };

  const currentColor = colorMap[status] || 'bg-slate-500';

  return (
    <span className="relative flex h-2.5 w-2.5">
      {ping && (
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentColor} opacity-75`}
        />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentColor}`} />
    </span>
  );
};
