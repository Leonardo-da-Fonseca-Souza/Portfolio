import React from 'react';

export default function StatsSection() {
  const stats = [
    { label: "Notícias Processadas", value: "1.847", change: "+23 hoje" },
    { label: "Publicações Enviadas", value: "943", change: "+12 hoje" },
    { label: "Score Médio IA", value: "84.2", change: "+1.4 pts" },
    { label: "Taxa de Aprovação", value: "78%", change: "-2% semana", isNegative: true }
  ];

  return (
    <section className="py-16 bg-[#0d1130]/30 border-y border-[#131840] px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center space-y-2 p-4">
            <span className="text-xs font-bold font-mono tracking-widest text-[#6b7499] uppercase">{stat.label}</span>
            <div className="font-display text-4xl sm:text-5xl font-bold text-white">{stat.value}</div>
            <div className={`text-xs font-semibold font-mono ${stat.isNegative ? 'text-[#ff6467]' : 'text-[#00d492]'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
