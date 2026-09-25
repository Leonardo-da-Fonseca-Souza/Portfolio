import React from 'react';
import { ShieldCheck, ShieldAlert, Key, CheckCircle2, Lock, FileText } from 'lucide-react';
import { useIAMBindings } from '../hooks/useIAMBindings';
import { Badge } from '../components/Badge';

export const SecurityTab: React.FC = () => {
  const { data, loading } = useIAMBindings();

  if (loading || !data) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono">
        Auditando permissões IAM e Security Command Center...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security KPI Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Service Accounts</span>
            <span className="text-xl font-bold text-white block">3 Ativas</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">IAM Bindings</span>
            <span className="text-xl font-bold text-white block">4 Válidas</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">VPC Service Controls</span>
            <span className="text-xl font-bold text-white block">Ativo (Perímetro)</span>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400">Audit Logs</span>
            <span className="text-xl font-bold text-white block">100% Auditável</span>
          </div>
        </div>
      </div>

      {/* IAM Bindings Table */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Tabela de Mapeamento IAM & Least Privilege</h3>
            <p className="text-xs text-slate-400">Vinculação de Service Accounts, Roles e Escopos de Recursos GCP</p>
          </div>
          <Badge variant="emerald">Baseline Conforme</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Service Account Principal</th>
                <th className="pb-3 font-semibold">GCP IAM Role</th>
                <th className="pb-3 font-semibold">Escopo / Recurso</th>
                <th className="pb-3 font-semibold text-right">Status Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              {data.bindings.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-900/50">
                  <td className="py-3 pr-4 text-indigo-300 font-semibold">{b.principal}</td>
                  <td className="py-3 px-4 text-purple-300">{b.role}</td>
                  <td className="py-3 px-4 text-slate-400">{b.scope}</td>
                  <td className="py-3 pl-4 text-right">
                    <Badge variant={b.status === 'active' ? 'emerald' : 'amber'}>
                      {b.status === 'active' ? 'Least Privilege' : 'Violação'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Checklist */}
      <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white">Checklist de Compliance & Postura de Segurança GCP</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">Cloud Audit Logs habilitados em todos os serviços</span>
            </div>
            <Badge variant="emerald">OK</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">Restrição de Localização da Org: southamerica-east1</span>
            </div>
            <Badge variant="emerald">OK</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">VPC Service Controls ativado para BigQuery & Pub/Sub</span>
            </div>
            <Badge variant="emerald">OK</Badge>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">CMEK (Customer-Managed Encryption Keys) configurado</span>
            </div>
            <Badge variant="emerald">OK</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
