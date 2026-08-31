import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StatsGrid from './components/StatsGrid';
import FeedTab from './components/FeedTab';
import SourcesTab from './components/SourcesTab';
import DestinationsTab from './components/DestinationsTab';
import Footer from './components/Footer';
import { Newspaper, Globe, Share2, Settings, LayoutDashboard, ArrowLeft } from 'lucide-react';
import HeroSection from './components/sections/HeroSection';
import FeatureGrid from './components/sections/FeatureGrid';
import StatsSection from './components/sections/StatsSection';
import LeadForm from './components/sections/LeadForm';
import ChatBox from './components/sections/ChatBox';

const API_BASE_URL = 'http://localhost:8000/api/v1';

export default function App() {
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'admin'
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'sources' | 'destinations' | 'settings'

  // Stats Grid State
  const [stats, setStats] = useState([
    { label: "NOTÍCIAS PROCESSADAS", value: "1.847", change: "+23 hoje", isPositive: true },
    { label: "PUBLICAÇÕES ENVIADAS", value: "943", change: "+12 hoje", isPositive: true },
    { label: "SCORE MÉDIO IA", value: "84.2", change: "+1.4 pts", isPositive: true },
    { label: "TAXA DE APROVAÇÃO", value: "78%", change: "-2% semana", isPositive: false },
  ]);

  // Feed State
  const [newsList, setNewsList] = useState([
    {
      id: "1:125",
      score: "94",
      status: "Publicado",
      category: "FIIs",
      tags: ["#FII", "#Logística", "#Captação"],
      title: "HGLG11 registra captação recorde de R$ 1,2 bi em novos lotes",
      source: "Valor Econômico",
      time: "há 5 min",
      destinations: ["LinkedIn", "Telegram"]
    },
    {
      id: "1:177",
      score: "88",
      status: "Aguardando",
      category: "Mercado",
      tags: ["#IGP-M", "#Locação", "#Inflação"],
      title: "IGP-M acumula alta de 4,7% no ano e pressiona reajuste do aluguel",
      source: "InfoMoney",
      time: "há 11 min",
      destinations: ["LinkedIn", "Newsletter"]
    },
    {
      id: "1:229",
      score: "91",
      status: "Publicado",
      category: "Lançamentos",
      tags: ["#Cyrela", "#Alto Padrão", "#SP"],
      title: "Cyrela anuncia empreendimento de R$ 890 mi no Jardins em SP",
      source: "Exame Invest",
      time: "há 19 min",
      destinations: ["LinkedIn", "Telegram", "Twitter"]
    },
    {
      id: "1:281",
      score: "76",
      status: "Em revisão",
      category: "Regulatório",
      tags: ["#CVM", "#Regulação", "#FII"],
      title: "CVM atualiza instrução sobre FIIs e amplia regras de governança",
      source: "Estadão Imóveis",
      time: "há 26 min",
      destinations: ["LinkedIn", "Newsletter"]
    },
    {
      id: "1:333",
      score: "97",
      status: "Publicado",
      category: "Economia",
      tags: ["#Selic", "#Crédito", "#CEF"],
      title: "Selic em queda sustenta crédito imobiliário: CEF planeja novos fundos",
      source: "Valor Econômico",
      time: "há 34 min",
      destinations: ["LinkedIn", "Telegram", "Newsletter"]
    },
    {
      id: "1:386",
      score: "62",
      status: "Descartado",
      category: "Regional",
      tags: ["#Recife", "#Comercial", "#Regional"],
      title: "Preços de imóveis comerciais em Recife sobem 12,3% no trimestre",
      source: "Secovi-SP",
      time: "há 48 min",
      destinations: []
    }
  ]);

  // Sources State
  const [sourcesList, setSourcesList] = useState([
    { name: "Valor Econômico", url: "valoreconomico.com.br", status: "active", updated: "há 3 min" },
    { name: "InfoMoney", url: "infomoney.com.br", status: "active", updated: "há 7 min" },
    { name: "Exame Invest", url: "exame.com/invest", status: "active", updated: "há 12 min" },
    { name: "Estadão Imóveis", url: "estadao.com.br/imoveis", status: "active", updated: "há 18 min" },
    { name: "CBIC Notícias", url: "cbic.org.br", status: "paused", updated: "" },
    { name: "Secovi-SP", url: "secovi.com.br", status: "active", updated: "há 24 min" },
    { name: "FipeZap", url: "fipezap.zapimoveis.com.br", status: "active", updated: "há 31 min" }
  ]);

  // Destinations State
  const [destinationsList, setDestinationsList] = useState([
    { name: "LinkedIn", type: "Social", status: "ativo", publications: "312", icon: "💼" },
    { name: "Telegram Canal", type: "Mensageiro", status: "ativo", publications: "541", icon: "📣" },
    { name: "Newsletter (Beehiiv)", type: "Email", status: "ativo", publications: "89", icon: "📧" },
    { name: "Twitter / X", type: "Social", status: "pausado", publications: "201", icon: "𝕏" },
    { name: "Make Webhook", type: "Automação", status: "ativo", publications: "1.240", icon: "⚙️" }
  ]);

  // Fetch backend data if available
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, sourcesRes, destsRes, statsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/news`),
          fetch(`${API_BASE_URL}/sources`),
          fetch(`${API_BASE_URL}/destinations`),
          fetch(`${API_BASE_URL}/stats`)
        ]);
        
        if (newsRes.ok) setNewsList(await newsRes.json());
        if (sourcesRes.ok) setSourcesList(await sourcesRes.json());
        if (destsRes.ok) setDestinationsList(await destsRes.json());
        if (statsRes.ok) setStats(await statsRes.json());
      } catch (err) {
        console.log("Backend not online yet. Running in offline mock mode.");
      }
    };
    fetchData();
  }, []);

  // Action handlers
  const handleUpdateStatus = async (newsId, newStatus) => {
    // Optimistic UI update
    setNewsList(prev => prev.map(item => item.id === newsId ? { ...item, status: newStatus } : item));
    
    // API Call
    try {
      await fetch(`${API_BASE_URL}/news/${newsId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error("Failed to sync status update with backend", err);
    }
  };

  const handleToggleSource = async (sourceName) => {
    setSourcesList(prev => prev.map(s => s.name === sourceName ? { ...s, status: s.status === 'active' ? 'paused' : 'active' } : s));

    try {
      await fetch(`${API_BASE_URL}/sources/${sourceName}/toggle`, { method: 'POST' });
    } catch (err) {
      console.error("Failed to toggle source on backend", err);
    }
  };

  const handleAddSource = async (newSource) => {
    setSourcesList(prev => [...prev, newSource]);

    try {
      await fetch(`${API_BASE_URL}/sources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSource)
      });
    } catch (err) {
      console.error("Failed to save new source to backend", err);
    }
  };

  const handleToggleDestination = async (destName) => {
    setDestinationsList(prev => prev.map(d => d.name === destName ? { ...d, status: d.status === 'ativo' ? 'pausado' : 'ativo' } : d));

    try {
      await fetch(`${API_BASE_URL}/destinations/${destName}/toggle`, { method: 'POST' });
    } catch (err) {
      console.error("Failed to toggle destination on backend", err);
    }
  };

  const scrollToLeadForm = () => {
    const element = document.getElementById('lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (viewMode === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-background text-white selection:bg-[#00c896]/30">
        {/* Landing Page Navbar */}
        <header className="border-b border-[#131840] bg-[#0d1130]/60 backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-display text-xl font-bold tracking-tight text-white">
                Imoveis<span className="text-[#00c896]">AI</span>
              </span>
            </div>
            <button
              onClick={() => setViewMode('admin')}
              className="flex items-center space-x-2 rounded-lg border border-[#131840] bg-[#131840]/30 hover:bg-[#131840]/60 hover:text-white px-4 py-2 text-xs font-semibold font-mono text-[#00c896] transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Acessar Painel</span>
            </button>
          </div>
        </header>

        {/* Landing Page Content */}
        <main className="flex-1 space-y-16 pb-12">
          <HeroSection onGetBetaAccess={scrollToLeadForm} />
          <StatsSection />
          <FeatureGrid />
          <LeadForm />
        </main>

        <footer className="border-t border-[#131840] bg-[#0d1130]/20 py-8 px-4 text-center">
          <p className="text-xs text-[#6b7499]">
            © {new Date().getFullYear()} ImoveisAI. Todos os direitos reservados.
          </p>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      
      {/* Header Bar with Back Button */}
      <div className="border-b border-[#131840] bg-[#0d1130] px-4 py-2 md:px-8 flex items-center">
        <button
          onClick={() => setViewMode('landing')}
          className="flex items-center space-x-2 rounded-lg border border-[#131840]/60 bg-[#131840]/10 hover:bg-[#131840]/40 px-3 py-1.5 text-xs font-semibold text-[#6b7499] hover:text-white transition-all mr-4"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Voltar à Landing Page</span>
        </button>
      </div>

      <Header />

      {/* Main Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8 space-y-8">
        
        {/* Statistics Widgets */}
        <StatsGrid stats={stats} />

        {/* Modular Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar / Left Column Navigation */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-xs font-bold tracking-widest text-[#6b7499] uppercase font-mono px-3 mb-3">Navegação</h3>
            <button
              onClick={() => setActiveTab('feed')}
              className={`w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                  : 'text-[#6b7499] hover:bg-[#131840]/30 hover:text-white border border-transparent'
              }`}
            >
              <Newspaper className="h-5 w-5" />
              <span className="font-display">Feed de Notícias</span>
            </button>
            
            <button
              onClick={() => setActiveTab('sources')}
              className={`w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'sources'
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                  : 'text-[#6b7499] hover:bg-[#131840]/30 hover:text-white border border-transparent'
              }`}
            >
              <Globe className="h-5 w-5" />
              <span className="font-display">Fontes</span>
            </button>
            
            <button
              onClick={() => setActiveTab('destinations')}
              className={`w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'destinations'
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                  : 'text-[#6b7499] hover:bg-[#131840]/30 hover:text-white border border-transparent'
              }`}
            >
              <Share2 className="h-5 w-5" />
              <span className="font-display">Destinos</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-[#00c896]/10 text-[#00c896] border border-[#00c896]/20'
                  : 'text-[#6b7499] hover:bg-[#131840]/30 hover:text-white border border-transparent'
              }`}
            >
              <span className="text-lg">💬</span>
              <span className="font-display">IA RAG Chat</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20'
                  : 'text-[#6b7499] hover:bg-[#131840]/30 hover:text-white border border-transparent'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="font-display">Configuração</span>
            </button>
          </div>

          {/* Dynamic Content Panel Column */}
          <div className="lg:col-span-3">
            {activeTab === 'feed' && (
              <FeedTab newsList={newsList} onUpdateStatus={handleUpdateStatus} />
            )}
            
            {activeTab === 'sources' && (
              <SourcesTab sources={sourcesList} onToggleSource={handleToggleSource} onAddSource={handleAddSource} />
            )}
            
            {activeTab === 'destinations' && (
              <DestinationsTab destinations={destinationsList} onToggleDestination={handleToggleDestination} />
            )}

            {activeTab === 'chat' && (
              <ChatBox />
            )}

            {activeTab === 'settings' && (
              <div className="rounded-xl border border-[#131840] bg-[#0d1130] p-8 text-center space-y-4">
                <Settings className="h-12 w-12 text-[#6b7499] mx-auto animate-spin" style={{ animationDuration: '6s' }} />
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">Configurações do Agente de IA</h3>
                  <p className="text-sm text-[#6b7499] max-w-md mx-auto mt-1">Configurações de moderação de IA, limiares de score de aprovação e agendas de varredura automáticas.</p>
                </div>
                <div className="border border-[#131840] rounded-xl p-5 bg-[#07091a] text-left space-y-4 max-w-lg mx-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#6b7499] font-mono">LIMIAR DE APROVAÇÃO AUTOMÁTICA</span>
                    <span className="text-sm font-bold text-[#00c896] font-mono">85+ SCORE</span>
                  </div>
                  <div className="w-full bg-[#131840] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#00c896] h-full w-[85%]" />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#131840]/60">
                    <span className="text-xs font-semibold text-[#6b7499] font-mono">VARREDURA RECORRENTE</span>
                    <span className="text-xs font-bold text-white font-mono">A CADA 15 MIN</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* Footer Diagnostic Panel */}
      <Footer activeSourcesCount={sourcesList.filter(s => s.status === 'active').length} />

    </div>
  );
}
