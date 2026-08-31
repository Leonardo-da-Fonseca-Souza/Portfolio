import React, { useState } from 'react';
import Input from '../ui/Input';
import CTAButton from '../ui/CTAButton';

export default function LeadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company: company || null,
          role: role || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail?.[0]?.msg || errorData.detail || 'Erro ao enviar cadastro. Verifique os dados.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setCompany('');
      setRole('');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Erro de conexão com o servidor.');
    }
  };

  return (
    <section id="lead-form" className="py-20 px-4 max-w-lg mx-auto scroll-mt-10">
      <div className="rounded-2xl border border-[#131840] bg-[#0d1130] p-8 space-y-6 relative overflow-hidden">
        {/* Subtle green indicator border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00c896] to-[#00d492]" />

        <div className="text-center space-y-2">
          <h2 className="font-display text-2xl font-bold text-white">Solicitar Acesso Beta</h2>
          <p className="font-sans text-xs text-[#6b7499]">
            Junte-se à lista de espera e seja um dos primeiros a testar o agente inteligente.
          </p>
        </div>

        {status === 'success' ? (
          <div className="rounded-xl border border-[#00c896]/20 bg-[#00bc7d]/10 p-6 text-center space-y-3">
            <span className="text-3xl">🎉</span>
            <h3 className="font-display text-lg font-semibold text-[#00d492]">Cadastro Confirmado!</h3>
            <p className="font-sans text-sm text-[#a0a8c0]">
              Obrigado pelo interesse! Nossa equipe entrará em contato em breve com os próximos passos.
            </p>
            <CTAButton onClick={() => setStatus('idle')} className="w-full mt-4">
              Fazer novo cadastro
            </CTAButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Seu Nome"
              id="name"
              placeholder="Digite seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="E-mail Corporativo"
              id="email"
              type="email"
              placeholder="seu.nome@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Empresa"
              id="company"
              placeholder="Nome da sua empresa ou FII"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />

            <Input
              label="Cargo / Função"
              id="role"
              placeholder="Ex: Gestor de FII, Corretor"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />

            {status === 'error' && (
              <div className="rounded-lg border border-[#ff6467]/20 bg-[#fb2c36]/10 p-4 text-xs text-[#ff6467] font-medium leading-relaxed">
                ⚠️ {errorMessage}
              </div>
            )}

            <CTAButton
              type="submit"
              disabled={status === 'loading'}
              className="w-full pt-3 pb-3"
            >
              {status === 'loading' ? 'Enviando...' : 'Garantir Minha Vaga'}
            </CTAButton>
          </form>
        )}
      </div>
    </section>
  );
}
