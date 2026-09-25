import React, { useState } from 'react';
import { DashboardHeader } from './components/DashboardHeader';
import { OverviewTab } from './tabs/OverviewTab';
import { PipelineTab } from './tabs/PipelineTab';
import { FinOpsTab } from './tabs/FinOpsTab';
import { SecurityTab } from './tabs/SecurityTab';
import { AgentModal } from './components/AgentModal';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isAgentModalOpen, setIsAgentModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Sticky Header */}
      <DashboardHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onTriggerAgent={() => setIsAgentModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'pipeline' && <PipelineTab />}
        {activeTab === 'finops' && <FinOpsTab />}
        {activeTab === 'security' && <SecurityTab />}
      </main>

      {/* Agent Reasoning Modal */}
      <AgentModal
        isOpen={isAgentModalOpen}
        onClose={() => setIsAgentModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 text-center text-xs text-slate-500 font-mono">
        GCP Data Pipeline Monitoring & Agentic Observability Platform • Powered by Google ADK & FastAPI
      </footer>
    </div>
  );
};

export default App;
