import React from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export default function Header({ status = "Agente Ativo", lastExecution = "08:47:12" }) {
  return (
    <header className="border-b border-[#131840] bg-[#0d1130] py-4 px-6 md:px-8">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left Side: Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00c896]/10 text-brand-primary">
            <ShieldCheck className="h-6 w-6 text-brand-primary animate-pulse" />
          </div>
          <div className="flex items-center space-x-2 font-display">
            <span className="text-xl font-bold tracking-tight text-white">Imoveis<span className="text-brand-primary">AI</span></span>
            <span className="text-[#6b7499]">|</span>
            <span className="text-xs md:text-sm text-[#6b7499] font-medium">Agente de Notícias Imobiliárias · Brasil</span>
          </div>
        </div>

        {/* Right Side: Agent Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 rounded-full bg-[#00bc7d]/10 px-3.5 py-1.5 border border-[#00bc7d]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success-text opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success-text"></span>
            </span>
            <span className="text-xs font-semibold text-status-success-text tracking-wide uppercase font-mono">{status}</span>
          </div>
          
          <div className="text-xs md:text-sm text-[#6b7499] flex items-center space-x-1 font-mono">
            <span>Última execução:</span>
            <span className="text-white font-medium">{lastExecution}</span>
          </div>
        </div>

      </div>
    </header>
  );
}
