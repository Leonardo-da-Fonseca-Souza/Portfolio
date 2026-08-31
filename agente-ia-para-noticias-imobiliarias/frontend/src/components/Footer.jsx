import React from 'react';
import { Cpu } from 'lucide-react';

export default function Footer({ activeSourcesCount = 6, nextScanTime = "08:52:00", cycle = "1.847", version = "v0.9.1" }) {
  return (
    <footer className="border-t border-[#131840] bg-[#0d1130] py-4 px-6 md:px-8 mt-auto text-xs text-[#6b7499] font-mono">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left diagnostics */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <div className="flex items-center space-x-1.5 text-brand-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className="font-bold uppercase tracking-wider text-brand-primary">AGENTE RODANDO</span>
          </div>
          <span>·</span>
          <span>CICLO #{cycle}</span>
          <span>·</span>
          <span>{activeSourcesCount} FONTES ATIVAS</span>
          <span>·</span>
          <span>PRÓXIMA VARREDURA: {nextScanTime}</span>
        </div>

        {/* Right versioning */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          <Cpu className="h-3.5 w-3.5" />
          <span>ImoveisAI {version} · make.com/integração ativo</span>
        </div>

      </div>
    </footer>
  );
}
