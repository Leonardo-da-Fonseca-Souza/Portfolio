export interface AnomalyFlag {
  metric: string;
  severity: 'warning' | 'error';
  value: number;
  threshold: number;
  message: string;
}

export interface MetricsSnapshot {
  timestamp: string;
  throughput_events_per_sec: number;
  latency_p99_ms: number;
  dataflow_worker_count: number;
  pubsub_backlog_messages: number;
  dataflow_job_state: string;
  shuffle_mode: 'SERVICE' | 'DISK';
  anomaly_flags: AnomalyFlag[];
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  service: 'Dataflow' | 'Pub/Sub' | 'BigQuery' | 'Looker' | 'IAM' | 'Monitoring';
  message: string;
  resource_labels: Record<string, string>;
  trace_id?: string;
}

export interface ServiceCost {
  service_name: string;
  cost_usd: number;
  pct_of_total: number;
}

export interface OptimizationSaving {
  name: string;
  description: string;
  saving_pct: number;
  saving_metric: string;
  status: 'active' | 'inactive' | 'error';
}

export interface HourlyTrend {
  hours: string[];
  total_usd: number[];
  bigquery_usd: number[];
  dataflow_usd: number[];
}

export interface FinOpsCostsResponse {
  daily_total_usd: number;
  daily_delta_pct: number;
  cost_by_service: ServiceCost[];
  savings_by_optimization: OptimizationSaving[];
  hourly_trend_12h: HourlyTrend;
}

export interface IAMBinding {
  role: string;
  principal: string;
  scope: string;
  status: 'active' | 'violation' | 'excess_privilege';
  color_hint: string;
}

export interface AuthFlow {
  from_service: string;
  to_service: string;
  permission: string;
  color_hint: string;
}

export interface ComplianceViolation {
  control: string;
  severity: 'critical' | 'high' | 'medium';
  description: string;
  remediation: string;
}

export interface IAMSecurityResponse {
  service_accounts: { email: string; name: string; status: string }[];
  bindings: IAMBinding[];
  authorization_flows: AuthFlow[];
  compliance: {
    audit_logs_enabled: boolean;
    org_policy_location: string;
    vpc_sc_perimeter_active: boolean;
    cmek_configured: boolean;
    violations: ComplianceViolation[];
  };
}

export interface AgentFinalOutput {
  summary: string;
  root_cause?: string;
  confidence?: number;
  remediation_steps: string[];
  estimated_impact?: string;
}

export interface AgentStreamEvent {
  event_type: 'token' | 'tool_call' | 'tool_result' | 'final';
  content?: string;
  tool_name?: string;
  tool_result?: Record<string, any>;
  final_output?: AgentFinalOutput;
}
