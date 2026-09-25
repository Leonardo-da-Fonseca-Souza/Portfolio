import React from 'react';
import { PipelineFlowDiagram } from '../components/PipelineFlowDiagram';
import { Badge } from '../components/Badge';
import { CheckCircle2, Shield, Cpu, HardDrive } from 'lucide-react';

export const PipelineTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <PipelineFlowDiagram />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Especificação do Apache Beam / Dataflow</h3>
          </div>
          <p className="text-xs text-slate-400">
            Pipeline de streaming tolerante a falhas com janela deslizante de 60 segundos e watermark dinâmico.
          </p>

          <ul className="space-y-2 text-xs text-slate-300 font-mono pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Runner: Dataflow Runner V2 (Unified Worker)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Shuffle: Dataflow Service-based Shuffle</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Autoscaling: Throughput-based (min 4, max 32)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Checkpointing: Exactly-Once Processing</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Arquitetura BigQuery & Storage</h3>
          </div>
          <p className="text-xs text-slate-400">
            Modelo de dados colunar otimizado com particionamento diário e clustering para acelerar BI.
          </p>

          <ul className="space-y-2 text-xs text-slate-300 font-mono pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Partition Field: DATE(ingestion_timestamp)</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Clustering Keys: [event_type, user_region]</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Write Method: Streaming Buffer High-Throughput</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Data Expiration: 365 Dias (Tiered Storage)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
