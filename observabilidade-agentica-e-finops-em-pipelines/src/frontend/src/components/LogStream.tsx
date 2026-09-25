import React from 'react';
import { Terminal, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';
import { LogEntry } from '../types';

interface LogStreamProps {
  logs: LogEntry[];
  isConnected: boolean;
}

export const LogStream: React.FC<LogStreamProps> = ({ logs, isConnected }) => {
  const levelIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'WARN':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
    }
  };

  const levelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-rose-400 font-bold bg-rose-500/10 px-1.5 py-0.5 rounded';
      case 'WARN':
        return 'text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded';
      default:
        return 'text-emerald-400 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded';
    }
  };

  return (
    <div className="glass-panel p-4 rounded-xl border border-slate-800 flex flex-col h-[320px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Cloud Logging Stream (SSE)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw
            className={`w-3.5 h-3.5 text-indigo-400 ${isConnected ? 'animate-spin' : ''}`}
          />
          <span className="text-[11px] font-mono text-slate-400">
            {isConnected ? 'Transmitindo...' : 'Reconectando'}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto font-mono text-xs mt-3 space-y-2 pr-1">
        {logs.length === 0 ? (
          <div className="text-center py-10 text-slate-500">Aguardando novos eventos do Cloud Logging...</div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-2 rounded bg-slate-900/60 border border-slate-800/40 hover:bg-slate-900 transition-colors"
            >
              {levelIcon(log.level)}
              <span className="text-slate-500 text-[10px] shrink-0 pt-0.5">
                {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
              </span>
              <span className={`text-[10px] shrink-0 ${levelColor(log.level)}`}>
                {log.service}
              </span>
              <p className="text-slate-200 text-xs break-all flex-1">{log.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
