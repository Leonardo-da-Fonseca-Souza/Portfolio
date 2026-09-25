import React from 'react';
import { Activity, Clock, Cpu, MessageSquare, Radio, Layers, Database, BarChart3 } from 'lucide-react';
import { useMetricsStream } from '../hooks/useMetricsStream';
import { useLogStream } from '../hooks/useLogStream';
import { MetricCard } from '../components/MetricCard';
import { ServiceCard } from '../components/ServiceCard';
import { PipelineFlowDiagram } from '../components/PipelineFlowDiagram';
import { LogStream } from '../components/LogStream';

export const OverviewTab: React.FC = () => {
  const { metrics, error } = useMetricsStream();
  const { logs, isConnected: logsConnected } = useLogStream();

  // Histórico para sparklines
  const sparklineThroughput = [118000, 122000, 125000, 127000, 128450];
  const sparklineLatency = [240, 260, 275, 290, metrics?.latency_p99_ms || 284];

  const getMetricStatus = (key: 'latency' | 'backlog') => {
    if (!metrics) return 'healthy';
    if (key === 'latency') {
      if (metrics.latency_p99_ms > 480) return 'error';
      if (metrics.latency_p99_ms > 400) return 'warning';
    }
    if (key === 'backlog') {
      if (metrics.pubsub_backlog_messages > 20000) return 'error';
      if (metrics.pubsub_backlog_messages > 5000) return 'warning';
    }
    return 'healthy';
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
          ⚠️ {error}
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Throughput do Pipeline"
          value={metrics ? metrics.throughput_events_per_sec : 128450}
          unit="events/s"
          subtext="Pub/Sub Streaming Ingestion"
          sparklineData={sparklineThroughput}
          icon={<Activity className="w-4 h-4" />}
        />
        <MetricCard
          title="Latência P99"
          value={metrics ? metrics.latency_p99_ms : 284.5}
          unit="ms"
          subtext="Dataflow End-to-End Processing"
          status={getMetricStatus('latency')}
          sparklineData={sparklineLatency}
          icon={<Clock className="w-4 h-4" />}
        />
        <MetricCard
          title="Workers Dataflow"
          value={metrics ? metrics.dataflow_worker_count : 12}
          unit="vCPUs"
          subtext="Autoscaling (4 - 32 vCPUs)"
          icon={<Cpu className="w-4 h-4" />}
        />
        <MetricCard
          title="Backlog Pub/Sub"
          value={metrics ? metrics.pubsub_backlog_messages : 1240}
          unit="msgs"
          subtext="Undelivered Subscription Queue"
          status={getMetricStatus('backlog')}
          icon={<MessageSquare className="w-4 h-4" />}
        />
      </div>

      {/* Topology Diagram */}
      <PipelineFlowDiagram />

      {/* Service Cards 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ServiceCard
          name="Cloud Pub/Sub Ingestion"
          type="Messaging Topic & Subscription"
          status="healthy"
          accentColor="blue"
          icon={<Radio className="w-5 h-5" />}
          metrics={[
            { label: 'Ack Latency P95', value: '18.4 ms' },
            { label: 'Retenção', value: '7 Dias' },
            { label: 'Subscriptions', value: '4 Ativas' },
            { label: 'Throughput Peak', value: '131k msg/s' },
          ]}
        />
        <ServiceCard
          name="Cloud Dataflow Runner"
          type="Apache Beam Streaming Engine"
          status={getMetricStatus('latency')}
          accentColor="purple"
          icon={<Layers className="w-5 h-5" />}
          metrics={[
            { label: 'Job State', value: metrics?.dataflow_job_state || 'RUNNING' },
            { label: 'Shuffle Mode', value: metrics?.shuffle_mode || 'SERVICE' },
            { label: 'Current vCPUs', value: `${metrics?.dataflow_worker_count || 12} Cores` },
            { label: 'Max Autoscaling', value: '32 Workers' },
          ]}
        />
        <ServiceCard
          name="BigQuery Analytics Storage"
          type="Enterprise Data Warehouse"
          status="healthy"
          accentColor="emerald"
          icon={<Database className="w-5 h-5" />}
          metrics={[
            { label: 'Taxa de Ingestão', value: '462M rows/h' },
            { label: 'Particionamento', value: 'ingestion_date' },
            { label: 'Cache Hit Rate', value: '94.2%' },
            { label: 'Slot Utilization', value: '62.8%' },
          ]}
        />
        <ServiceCard
          name="Looker Executive Dashboards"
          type="Business Intelligence Engine"
          status="healthy"
          accentColor="amber"
          icon={<BarChart3 className="w-5 h-5" />}
          metrics={[
            { label: 'Dashboards Ativos', value: '8 Dashboards' },
            { label: 'Usuários Simultâneos', value: '42 Ativos' },
            { label: 'Query P95 Latency', value: '1.8s' },
            { label: 'Cache BI Hit', value: '88.5%' },
          ]}
        />
      </div>

      {/* Realtime LogStream */}
      <LogStream logs={logs} isConnected={logsConnected} />
    </div>
  );
};
