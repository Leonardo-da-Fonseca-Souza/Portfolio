import React, { useState } from 'react';
import { Bookmark, Clock, Share2, Shield, Eye, Trash2, CheckCircle2 } from 'lucide-react';

export default function FeedTab({ newsList = [], onUpdateStatus }) {
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

  const categories = ["TODOS", "FIIS", "MERCADO", "LANÇAMENTOS", "REGULATÓRIO", "ECONOMIA", "REGIONAL"];

  const filteredNews = selectedCategory === "TODOS"
    ? newsList
    : newsList.filter(item => item.category.toUpperCase() === selectedCategory);

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case 'publicado':
        return 'text-[#00d492] bg-[#00bc7d]/15 border-[#00bc7d]/35';
      case 'aguardando':
        return 'text-[#ffb900] bg-[#fe9a00]/15 border-[#fe9a00]/30';
      case 'em revisão':
        return 'text-[#51a2ff] bg-[#2b7fff]/15 border-[#2b7fff]/30';
      case 'descartado':
        return 'text-[#ff6467] bg-[#fb2c36]/15 border-[#fb2c36]/30';
      default:
        return 'text-white bg-[#131840]/50 border-white/10';
    }
  };

  const getScoreColor = (score) => {
    const num = parseInt(score);
    if (num >= 90) return 'text-[#00c896] border-[#00c896]/30 bg-[#00c896]/5';
    if (num >= 75) return 'text-[#ffb900] border-[#ffb900]/30 bg-[#ffb900]/5';
    return 'text-[#ff6467] border-[#ff6467]/30 bg-[#ff6467]/5';
  };

  return (
    <div className="space-y-6">
      
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#131840] pb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded px-4 py-1.5 text-xs font-semibold tracking-wider font-mono border transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-brand-primary text-[#07091a] border-brand-primary'
                  : 'bg-[#0d1130] text-[#6b7499] border-[#131840] hover:text-white hover:border-[#6b7499]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="text-xs text-[#6b7499] font-mono self-end sm:self-center">
          {filteredNews.length} {filteredNews.length === 1 ? 'notícia' : 'notícias'} encontrada{filteredNews.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#131840] p-12 text-center">
            <Bookmark className="h-10 w-10 text-[#6b7499] mb-3" />
            <p className="text-sm text-[#6b7499]">Nenhuma notícia encontrada nesta categoria.</p>
          </div>
        ) : (
          filteredNews.map((news) => (
            <div
              key={news.id}
              className="group relative flex flex-col md:flex-row gap-5 rounded-xl border border-[#131840] bg-[#0d1130] p-5 transition-all duration-300 hover:border-brand-primary/30 hover:bg-[#131840]/30"
            >
              
              {/* Score Column */}
              <div className="flex md:flex-col items-center justify-between md:justify-center md:border-r border-[#131840] md:pr-5 gap-2">
                <div className={`flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 ${getScoreColor(news.score)}`}>
                  <span className="text-xl font-bold font-display">{news.score}</span>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[#6b7499] -mt-1 font-mono">SCORE</span>
                </div>
                
                {/* Mobile tags & status */}
                <div className="flex md:hidden gap-1.5">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase ${getStatusStyles(news.status)}`}>
                    {news.status}
                  </span>
                </div>
              </div>

              {/* Main Content Info */}
              <div className="flex-1 space-y-3">
                
                {/* Meta details & tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Desktop status */}
                  <span className={`hidden md:inline-block rounded border px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase ${getStatusStyles(news.status)}`}>
                    {news.status}
                  </span>
                  
                  <span className="rounded bg-[#131840] px-2 py-0.5 text-[10px] font-semibold text-[#a0a8c0] font-mono">
                    {news.category}
                  </span>
                  
                  {news.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium text-[#6b7499] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* News Title */}
                <h3 className="font-display text-base font-semibold text-white group-hover:text-brand-primary transition-colors leading-snug">
                  {news.title}
                </h3>

                {/* Source & Date info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#6b7499] font-mono">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3.5 w-3.5" />
                    <span className="text-white font-medium">{news.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{news.time}</span>
                  </div>
                  
                  {news.destinations && news.destinations.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Share2 className="h-3.5 w-3.5 text-brand-primary" />
                      <span className="text-brand-primary font-medium">
                        {news.destinations.join(' · ')}
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Action Buttons Column */}
              <div className="flex md:flex-col items-center justify-end md:justify-center border-t border-[#131840] md:border-t-0 pt-3 md:pt-0 gap-2">
                {news.status.toLowerCase() === 'aguardando' && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(news.id, 'Publicado')}
                      className="flex items-center space-x-1 rounded bg-[#00bc7d]/10 hover:bg-[#00bc7d]/20 border border-[#00bc7d]/20 text-[#00d492] px-3 py-1.5 text-xs font-semibold font-mono"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Aprovar</span>
                    </button>
                    <button
                      onClick={() => onUpdateStatus(news.id, 'Descartado')}
                      className="flex items-center space-x-1 rounded bg-[#fb2c36]/10 hover:bg-[#fb2c36]/20 border border-[#fb2c36]/20 text-[#ff6467] px-3 py-1.5 text-xs font-semibold font-mono"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Rejeitar</span>
                    </button>
                  </>
                )}
                {news.status.toLowerCase() === 'em revisão' && (
                  <button
                    onClick={() => onUpdateStatus(news.id, 'Publicado')}
                    className="flex items-center space-x-1 rounded bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 text-brand-primary px-3 py-1.5 text-xs font-semibold font-mono w-full justify-center"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Publicar</span>
                  </button>
                )}
                {news.status.toLowerCase() === 'publicado' && (
                  <span className="text-[10px] text-[#6b7499] italic font-mono">Publicado via Make</span>
                )}
                {news.status.toLowerCase() === 'descartado' && (
                  <button
                    onClick={() => onUpdateStatus(news.id, 'Aguardando')}
                    className="text-[10px] text-brand-primary hover:underline font-mono"
                  >
                    Restaurar
                  </button>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
