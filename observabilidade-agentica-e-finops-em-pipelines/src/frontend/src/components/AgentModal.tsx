import React, { useState } from 'react';
import { Sparkles, X, Bot, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { AgentFinalOutput } from '../types';
import { Badge } from './Badge';

interface AgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AgentModal: React.FC<AgentModalProps> = ({ isOpen, onClose }) => {
  const [selectedAgent, setSelectedAgent] = useState<'anomaly_correlator' | 'finops_optimizer' | 'iam_auditor'>('anomaly_correlator');
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState<string>('');
  const [finalOutput, setFinalOutput] = useState<AgentFinalOutput | null>(null);

  if (!isOpen) return null;

  const handleRunAgent = async () => {
    setLoading(true);
    setStreamText('');
    setFinalOutput(null);

    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    try {
      const response = await fetch(`${apiBase}/api/v1/agents/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent_id: selectedAgent,
          context: { project_id: 'demo-gcp-project' },
          stream: true,
        }),
      });

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.event_type === 'token') {
                setStreamText((prev) => prev + (data.content || ''));
              } else if (data.event_type === 'final' && data.final_output) {
                setFinalOutput(data.final_output);
              }
            } catch (err) {
              // ignora linhas incompletas
            }
          }
        }
      }
    } catch (err) {
      console.error('Erro na execução do agente:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Google ADK & LangGraph Agent Engine</h2>
              <p className="text-xs text-slate-400">Raciocínio Agêntico e Automação de Infraestrutura</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Agent Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Selecione o Agente Especializado:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'anomaly_correlator', name: 'Anomaly Correlator', model: 'Gemini 1.5 Pro', icon: Cpu },
                { id: 'finops_optimizer', name: 'FinOps Optimizer', model: 'Gemini 1.5 Pro', icon: Sparkles },
                { id: 'iam_auditor', name: 'IAM Security Auditor', model: 'Gemini 1.5 Pro', icon: ShieldCheck },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedAgent(item.id as any)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedAgent === item.id
                      ? 'border-indigo-500 bg-indigo-500/10 text-white'
                      : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <item.icon className="w-4 h-4 text-indigo-400 mb-2" />
                  <span className="block text-xs font-bold">{item.name}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{item.model}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunAgent}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-amber-300" />
                <span>Orquestrando Agentes no ADK...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Executar Raciocínio do Agente</span>
              </>
            )}
          </button>

          {/* Reasoning Stream */}
          {streamText && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300">
              <span className="text-slate-500 block mb-1 text-[10px] uppercase tracking-wider">
                Thinking Stream (Gemini 1.5 Pro SSE):
              </span>
              <p className="whitespace-pre-wrap leading-relaxed">{streamText}</p>
            </div>
          )}

          {/* Final Structured Output */}
          {finalOutput && (
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="emerald">Análise Concluída</Badge>
                {finalOutput.confidence && (
                  <span className="text-xs font-mono text-slate-400">
                    Confiança: <strong className="text-emerald-400">{(finalOutput.confidence * 100).toFixed(0)}%</strong>
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-white">{finalOutput.summary}</h4>

              {finalOutput.root_cause && (
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                    Causa Raiz Identificada:
                  </span>
                  <p className="text-xs text-slate-200">{finalOutput.root_cause}</p>
                </div>
              )}

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Passos de Remediação Recomendados:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {finalOutput.remediation_steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {finalOutput.estimated_impact && (
                <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-mono">
                  💡 Impacto Estimado: {finalOutput.estimated_impact}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
