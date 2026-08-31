import React from 'react';
import { Newspaper, Send, BarChart3, Percent, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatsGrid({ stats }) {
  const defaultStats = [
    {
      label: "NOTÍCIAS PROCESSADAS",
      value: "1.847",
      change: "+23 hoje",
      isPositive: true,
      icon: Newspaper,
    },
    {
      label: "PUBLICAÇÕES ENVIADAS",
      value: "943",
      change: "+12 hoje",
      isPositive: true,
      icon: Send,
    },
    {
      label: "SCORE MÉDIO IA",
      value: "84.2",
      change: "+1.4 pts",
      isPositive: true,
      icon: BarChart3,
    },
    {
      label: "TAXA DE APROVAÇÃO",
      value: "78%",
      change: "-2% semana",
      isPositive: false,
      icon: Percent,
    },
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {displayStats.map((stat, idx) => {
        const Icon = stat.icon || defaultStats[idx].icon;
        return (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-[#131840] bg-[#0d1130] p-6 transition-all duration-300 hover:border-brand-primary/40 hover:bg-[#131840]/60 hover:shadow-lg hover:shadow-brand-primary/5"
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider text-[#6b7499] uppercase font-mono">
                {stat.label}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#131840] text-[#6b7499] group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors">
                <Icon className="h-5 w-5" />
              </div>
            </div>

            {/* Value */}
            <div className="mt-4 flex items-baseline space-x-2">
              <span className="text-3xl font-bold tracking-tight text-white font-display">
                {stat.value}
              </span>
              <span
                className={`flex items-center text-xs font-semibold font-mono ${
                  stat.isPositive ? 'text-status-success-text' : 'text-status-danger-text'
                }`}
              >
                {stat.isPositive ? (
                  <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3.5 w-3.5" />
                )}
                {stat.change}
              </span>
            </div>
            
            {/* Decorative bottom line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-brand-primary/50 transition-all duration-500" />
          </div>
        );
      })}
    </div>
  );
}
