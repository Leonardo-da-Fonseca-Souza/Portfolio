import React, { useState } from 'react';
import { Plus, Play, Pause, Globe, RefreshCw } from 'lucide-react';

export default function SourcesTab({ sources = [], onToggleSource, onAddSource }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSourceName, setNewSourceName] = useState('');
  const [newSourceUrl, setNewSourceUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSourceName || !newSourceUrl) return;
    onAddSource({
      name: newSourceName,
      url: newSourceUrl,
      status: 'active',
      updated: 'Recém adicionado'
    });
    setNewSourceName('');
    setNewSourceUrl('');
    setShowAddForm(false);
  };

  const activeCount = sources.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      
      {/* Tab Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#131840] pb-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-white">Fontes de Coleta</h2>
          <p className="text-xs text-[#6b7499] mt-1 font-mono">
            {activeCount} de {sources.length} ativas · Ciclo de varredura: 15 min
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-1 self-start sm:self-center rounded bg-brand-primary text-[#07091a] px-4 py-2 text-xs font-semibold font-mono hover:bg-brand-glow transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar fonte</span>
        </button>
      </div>

      {/* Add Source Form Block */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-brand-primary/30 bg-[#131840]/30 p-5 space-y-4">
          <h4 className="text-sm font-semibold text-white font-display">Conectar Nova Fonte RSS/Crawler</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6b7499] font-mono mb-1">NOME DA FONTE</label>
              <input
                type="text"
                value={newSourceName}
                onChange={(e) => setNewSourceName(e.target.value)}
                placeholder="Ex: Valor Econômico"
                className="w-full bg-[#0d1130] border border-[#131840] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-primary font-sans"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6b7499] font-mono mb-1">URL DO PORTAL / RSS</label>
              <input
                type="text"
                value={newSourceUrl}
                onChange={(e) => setNewSourceUrl(e.target.value)}
                placeholder="Ex: valoreconomico.com.br"
                className="w-full bg-[#0d1130] border border-[#131840] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-primary font-sans"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3.5 py-1.5 border border-[#131840] text-[#6b7499] rounded text-xs font-semibold font-mono hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-brand-primary text-[#07091a] rounded text-xs font-semibold font-mono hover:bg-brand-glow"
            >
              Salvar Fonte
            </button>
          </div>
        </form>
      )}

      {/* Sources Grid/List */}
      <div className="overflow-hidden rounded-xl border border-[#131840] bg-[#0d1130]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#131840] bg-[#07091a]/40 text-[10px] font-bold tracking-wider text-[#6b7499] font-mono uppercase">
                <th className="py-4 px-6">Nome do Canal</th>
                <th className="py-4 px-6">Endereço Web / Feed</th>
                <th className="py-4 px-6">Última Varredura</th>
                <th className="py-4 px-6 text-right">Moderação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#131840] text-sm font-sans">
              {sources.map((source) => (
                <tr key={source.name} className="hover:bg-[#131840]/20 transition-colors">
                  
                  {/* Name and Icon */}
                  <td className="py-4 px-6 font-semibold text-white">
                    <div className="flex items-center space-x-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        source.status === 'active' ? 'bg-[#00c896]/10 text-brand-primary' : 'bg-status-danger-bg text-[#6b7499]'
                      }`}>
                        <Globe className="h-4 w-4" />
                      </div>
                      <span className="font-display">{source.name}</span>
                    </div>
                  </td>
                  
                  {/* URL */}
                  <td className="py-4 px-6 text-[#a0a8c0] font-mono text-xs">
                    {source.url}
                  </td>
                  
                  {/* Last updated */}
                  <td className="py-4 px-6 text-[#6b7499] font-mono text-xs">
                    {source.status === 'active' ? (
                      <div className="flex items-center space-x-1.5">
                        <RefreshCw className="h-3 w-3 animate-spin text-brand-primary" />
                        <span>{source.updated || 'Executando...'}</span>
                      </div>
                    ) : (
                      <span className="text-status-danger-text uppercase font-semibold text-[10px] bg-status-danger-bg px-2 py-0.5 rounded border border-status-danger-text/25">pausado</span>
                    )}
                  </td>
                  
                  {/* Active/Pause Mod */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onToggleSource(source.name)}
                      className={`inline-flex items-center space-x-1 rounded px-3 py-1 text-xs font-semibold font-mono border transition-all ${
                        source.status === 'active'
                          ? 'border-[#ff6467]/20 bg-[#ff6467]/5 text-[#ff6467] hover:bg-[#ff6467]/10'
                          : 'border-brand-primary/20 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary/10'
                      }`}
                    >
                      {source.status === 'active' ? (
                        <>
                          <Pause className="h-3.5 w-3.5" />
                          <span>Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5" />
                          <span>Ativar</span>
                        </>
                      )}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
