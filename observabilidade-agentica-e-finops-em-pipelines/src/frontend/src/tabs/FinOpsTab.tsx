import React from 'react';
import { DollarSign, TrendingDown, CheckCircle2, Zap, ShieldCheck } from 'lucide-react';
import { useFinOps } from '../hooks/useFinOps';
import { MetricCard } from '../components/MetricCard';
import { Badge } from '../components/Badge';

export const FinOpsTab: React.FC = () => {
  const { data, loading } = useFinOps();

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono">
        Carregando telemetria de custos FinOps...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* FinOps KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Custo Diário Total"
          value={`$${data.daily_total_usd.toFixed(2)}`}
          subtext="Total acumulado hoje (GCP Billing)"
          icon={<DollarSign className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          title="Variação Diária"
          value={`${data.daily_delta_pct}%`}
          subtext="Vs. média dos últimos 7 dias"
          status={data.daily_delta_pct < 0 ? 'healthy' : 'warning'}
          icon={<TrendingDown className="w-4 h-4 text-emerald-400" />}
        />
        <MetricCard
          title="Economia BQ (Particionamento)"
          value="68.0%"
          unit="menos bytes"
          subtext="Otimização por clustering ativa"
          icon={<Zap className="w-4 h-4 text-amber-400" />}
        />
        <MetricCard
          title="Economia Dataflow Shuffle"
          value="23.0%"
          unit="custo I/O"
          subtext="Shuffle em memória ativado"
          icon={<ShieldCheck className="w-4 h-4 text-indigo-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown per Service */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Distribuição de Custo por Serviço GCP</h3>
            <Badge variant="indigo">Billing Export</Badge>
          </div>

          <div className="space-y-3 pt-2">
            {data.cost_by_service.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">{item.service_name}</span>
                  <span className="font-mono text-slate-300">
                    ${item.cost_usd.toFixed(2)} ({item.pct_of_total.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    style={{ width: `${item.pct_of_total}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Optimizations Cards */}
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Otimizações FinOps Ativas no Pipeline</h3>

          <div className="space-y-3">
            {data.savings_by_optimization.map((opt, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <h4 className="text-xs font-bold text-slate-100">{opt.name}</h4>
                  </div>
                  <p className="text-xs text-slate-400 pl-6">{opt.description}</p>
                </div>
                <Badge variant="emerald">-{opt.saving_pct}%</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
