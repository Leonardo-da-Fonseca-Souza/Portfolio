import React, { useState, useEffect } from 'react';
import { Activity, Clock, Globe, ShieldCheck, Sparkles } from 'lucide-react';
import { StatusDot } from './StatusDot';
import { Badge } from './Badge';

interface DashboardHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onTriggerAgent: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  setActiveTab,
  onTriggerAgent,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'pipeline', label: 'Pipeline & Fluxo' },
    { id: 'finops', label: 'FinOps' },
    { id: 'security', label: 'IAM & Segurança' },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Product Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  GCP Data Pipeline Monitor
                </h1>
                <Badge variant="indigo">v3.0 Production</Badge>
              </div>
              <p className="text-xs text-slate-400">
                Observabilidade Agêntica & Governança FinOps em Tempo Real
              </p>
            </div>
          </div>

          {/* Region, Time & Agent Trigger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>southamerica-east1</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{time || '12:00:00'} BRT</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div className="flex items-center gap-1.5">
                <StatusDot status="healthy" />
                <span className="text-emerald-400 font-medium">ADC Autenticado</span>
              </div>
            </div>

            <button
              onClick={onTriggerAgent}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Análise Agêntica</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 mt-4 border-t border-slate-800/60 pt-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
