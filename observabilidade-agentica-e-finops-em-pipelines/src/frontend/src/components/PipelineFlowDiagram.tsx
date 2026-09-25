import React from 'react';
import { Database, Layers, Radio, BarChart3, ArrowRight } from 'lucide-react';
import { Badge } from './Badge';

export const PipelineFlowDiagram: React.FC = () => {
  const steps = [
    {
      id: 'pubsub',
      title: 'App Ingestion',
      subtitle: 'Cloud Pub/Sub',
      icon: <Radio className="w-5 h-5 text-indigo-400" />,
      metric: '128.4k msg/s',
      status: '18ms ack',
    },
    {
      id: 'dataflow',
      title: 'Stream Processing',
      subtitle: 'Cloud Dataflow',
      icon: <Layers className="w-5 h-5 text-purple-400" />,
      metric: '12 vCPUs (Auto)',
      status: 'Shuffle Mode',
    },
    {
      id: 'bigquery',
      title: 'Analytics Warehouse',
      subtitle: 'BigQuery DB',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      metric: '462M rows/h',
      status: 'Particionado',
    },
    {
      id: 'looker',
      title: 'BI & Executive Dash',
      subtitle: 'Looker Analytics',
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
      metric: '42 Ativos',
      status: '88% Cache Hit',
    },
  ];

  return (
    <div className="glass-panel p-5 rounded-xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Topologia do Pipeline de Dados GCP</h3>
          <p className="text-xs text-slate-400">Fluxo de Ingestão, Processamento e Analytics em Tempo Real</p>
        </div>
        <Badge variant="emerald">Live Stream SSE Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {steps.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col items-center text-center">
            <div className="w-full bg-slate-900/90 border border-slate-800 p-4 rounded-xl hover:border-indigo-500/50 transition-all group shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-slate-800/80 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                  Node #{idx + 1}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-100 text-left mt-2">{step.title}</h4>
              <p className="text-xs text-slate-400 text-left font-mono">{step.subtitle}</p>

              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-indigo-300 font-semibold">{step.metric}</span>
                <span className="text-emerald-400 text-[10px]">{step.status}</span>
              </div>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-indigo-500 animate-pulse">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
