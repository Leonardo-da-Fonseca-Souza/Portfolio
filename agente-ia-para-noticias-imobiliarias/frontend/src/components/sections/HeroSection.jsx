import React from 'react';
import CTAButton from '../ui/CTAButton';

export default function HeroSection({ onGetBetaAccess }) {
  return (
    <section className="relative overflow-hidden py-20 px-4 text-center space-y-8 max-w-4xl mx-auto">
      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-[#00c896]/10 blur-[80px] -z-10 pointer-events-none" />
      
      <div className="inline-flex items-center space-x-2 rounded-full border border-[#00c896]/20 bg-[#0d1130]/60 px-4 py-1.5 text-xs font-semibold text-[#00d492] font-mono">
        <span>✨ AGENTE OPERACIONAL ATIVO</span>
      </div>

      <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
        Seu Agente de Inteligência Artificial para <span className="text-[#00c896] hover:text-[#00d492] transition-colors">Notícias Imobiliárias</span>
      </h1>

      <p className="font-sans text-lg text-[#a0a8c0] max-w-2xl mx-auto leading-relaxed">
        Colete de forma autônoma de múltiplos portais, analise relevância com score inteligente, e distribua boletins informativos prontos em segundos.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <CTAButton onClick={onGetBetaAccess}>
          Solicitar Acesso Beta
        </CTAButton>
        <a
          href="#features"
          className="px-6 py-3 font-display text-sm font-semibold rounded-lg text-white hover:bg-[#131840]/40 border border-[#131840] hover:border-[#6b7499] transition-all duration-300"
        >
          Saiba Mais
        </a>
      </div>
    </section>
  );
}
