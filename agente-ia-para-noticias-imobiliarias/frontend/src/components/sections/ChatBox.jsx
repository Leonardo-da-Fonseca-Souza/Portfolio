import React, { useState, useRef, useEffect } from 'react';
import CTAButton from '../ui/CTAButton';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: 'model', content: 'Olá! Sou o assistente virtual da ImoveisAI. Em que posso te ajudar hoje sobre o mercado imobiliário?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          session_id: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Falha de conexão com o agente.');
      }

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'model',
        content: data.response,
        sources: data.sources || []
      }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'model',
        content: '⚠️ Ocorreu um erro ao consultar o agente de IA imobiliária. Por favor, tente novamente mais tarde.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-[#131840] bg-[#0d1130] flex flex-col h-[500px] overflow-hidden">
      {/* Chat Header */}
      <div className="border-b border-[#131840] bg-[#07091a]/40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00c896] animate-pulse" />
          <span className="font-display text-sm font-bold text-white">Chat ImoveisAI Agent</span>
        </div>
        <span className="font-mono text-[9px] text-[#6b7499]">SESSÃO: {sessionId}</span>
      </div>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
          >
            <div
              className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#00c896] text-slate-950 font-medium'
                  : 'bg-[#131840]/60 text-white border border-[#131840]'
              }`}
            >
              {msg.content}
            </div>

            {/* Sources list */}
            {msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 text-left bg-[#07091a]/30 rounded-lg p-2.5 border border-[#131840]/40 max-w-full space-y-1">
                <span className="font-mono text-[9px] text-[#6b7499] block font-bold">FONTES DE CONSULTA RAG:</span>
                <ul className="space-y-0.5">
                  {msg.sources.map((src, sIdx) => (
                    <li key={sIdx} className="font-mono text-[10px] text-[#a0a8c0] list-disc list-inside truncate">
                      {src.titulo}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 mr-auto bg-[#131840]/40 border border-[#131840]/60 px-4 py-3 rounded-xl max-w-[80%] text-[#a0a8c0] text-xs font-mono">
            <span className="animate-bounce">●</span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
            <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
            <span className="text-[11px] text-[#6b7499] ml-1">Consultando base de dados vetorizada...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-[#131840] bg-[#07091a]/30 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Pergunte sobre fundos imobiliários, captações, vacância..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          className="flex-1 bg-[#131840]/40 border border-[#131840] hover:border-[#6b7499]/40 focus:border-[#00c896] rounded-lg px-4 py-2.5 text-xs text-white placeholder-[#6b7499] outline-none transition-all font-sans"
        />
        <CTAButton type="submit" disabled={loading || !input.trim()} className="pt-2.5 pb-2.5 font-mono text-xs font-bold tracking-wider">
          ENVIAR
        </CTAButton>
      </form>
    </div>
  );
}
