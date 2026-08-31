import React from 'react';
import { Shield, Zap, Sparkles, Layout } from 'lucide-react';

export default function FeatureGrid() {
  const features = [
    {
      title: "Coleta Automatizada",
      desc: "Monitoramento em tempo real de 7+ portais líderes do mercado imobiliário brasileiro (Valor Econômico, InfoMoney, FipeZap).",
      icon: Layout,
    },
    {
      title: "Filtro e Score por IA",
      desc: "Algoritmos inteligentes atribuem score de relevância a cada artigo, filtrando ruídos e focando em notícias estratégicas (FIIs, Selic).",
      icon: Shield,
    },
    {
      title: "Resumos com Claude 3.5 Sonnet",
      desc: "Geração de resumos e clippings profissionais prontos para publicação de forma instantânea e no tamanho ideal.",
      icon: Sparkles,
    },
    {
      title: "Distribuição Multicanal",
      desc: "Envio automático para canais integrados como LinkedIn, Telegram, Newsletter e automações webhooks via Make.com.",
      icon: Zap,
    }
  ];

  return (
    <section id="features" className="py-16 px-4 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">Como Funciona a Plataforma</h2>
        <p className="font-sans text-sm text-[#6b7499] max-w-md mx-auto">
          Simplifique o monitoramento e a curadoria de mercado utilizando um pipeline automatizado de ponta a ponta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, idx) => (
          <div key={idx} className="rounded-xl border border-[#131840] bg-[#0d1130] p-6 hover:bg-[#131840]/40 transition-all duration-300 group">
            <div className="inline-flex p-3 rounded-lg bg-[#131840] text-[#00c896] mb-5 group-hover:bg-[#00c896]/10 transition-colors">
              <feat.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white mb-2">{feat.title}</h3>
            <p className="font-sans text-sm text-[#a0a8c0] leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
