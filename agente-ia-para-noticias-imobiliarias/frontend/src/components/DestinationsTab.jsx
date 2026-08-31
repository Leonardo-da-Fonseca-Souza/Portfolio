import React, { useState } from 'react';
import { Plus, Check, Copy, ToggleLeft, ToggleRight, Share2 } from 'lucide-react';

export default function DestinationsTab({ destinations = [], webhookUrl = "https://hook.eu2.make.com/xyz123abc456imoveisai", onToggleDestination }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#131840] pb-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-white">Destinos de Publicação</h2>
          <p className="text-xs text-[#6b7499] mt-1 font-mono">
            Canais de distribuição externa ativos no agente inteligente
          </p>
        </div>
        <button
          className="flex items-center space-x-1 self-start sm:self-center rounded bg-brand-primary text-[#07091a] px-4 py-2 text-xs font-semibold font-mono hover:bg-brand-glow transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Conectar canal</span>
        </button>
      </div>

      {/* Grid of channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map((channel) => (
          <div
            key={channel.name}
            className={`group rounded-xl border p-5 bg-[#0d1130] transition-all duration-300 ${
              channel.status === 'ativo' ? 'border-[#131840] hover:border-brand-primary/30' : 'border-[#131840]/60 opacity-60'
            }`}
          >
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{channel.icon}</span>
                <div>
                  <h4 className="font-display text-sm font-semibold text-white">{channel.name}</h4>
                  <span className="text-[10px] font-mono font-semibold tracking-wider text-[#6b7499] uppercase">{channel.type}</span>
                </div>
              </div>
              
              {/* Toggle Switch */}
              <button
                onClick={() => onToggleDestination(channel.name)}
                className={`text-2xl transition-colors focus:outline-none ${
                  channel.status === 'ativo' ? 'text-brand-primary' : 'text-[#6b7499]'
                }`}
              >
                {channel.status === 'ativo' ? (
                  <ToggleRight className="h-7 w-7" />
                ) : (
                  <ToggleLeft className="h-7 w-7" />
                )}
              </button>
            </div>

            {/* Publication Counts */}
            <div className="mt-4 flex items-center justify-between border-t border-[#131840]/60 pt-3">
              <span className="text-[10px] font-mono text-[#6b7499] uppercase font-bold">Publicações</span>
              <span className="font-mono text-sm font-bold text-white">{channel.publications}</span>
            </div>

          </div>
        ))}
      </div>

      {/* Webhook Endpoint section */}
      <div className="rounded-xl border border-[#131840] bg-[#0d1130] p-6 space-y-4">
        <div>
          <h3 className="font-display text-sm font-semibold text-white">Make Webhook Endpoint</h3>
          <p className="text-xs text-[#6b7499] mt-0.5 font-mono">Use esta URL de gatilho para integrar a publicação em outros fluxos automatizados do Make.com</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 bg-[#07091a] border border-[#131840] rounded px-4 py-2.5 font-mono text-xs text-[#a0a8c0] truncate select-all">
            {webhookUrl}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center space-x-2 rounded border border-[#131840] bg-[#131840]/40 text-[#a0a8c0] hover:text-white hover:bg-[#131840] px-4 py-2.5 text-xs font-semibold font-mono transition-all"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-brand-primary" />
                <span className="text-brand-primary">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
