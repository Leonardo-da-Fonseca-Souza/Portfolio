from datetime import datetime
from typing import Literal, Any
from pydantic import BaseModel, Field


class AnomalyFlag(BaseModel):
    metric: str
    severity: Literal["warning", "error"]
    value: float
    threshold: float
    message: str


class MetricsSnapshot(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    throughput_events_per_sec: float
    latency_p99_ms: float
    dataflow_worker_count: int
    pubsub_backlog_messages: int
    dataflow_job_state: Literal[
        "JOB_STATE_RUNNING", "JOB_STATE_DRAINING", "JOB_STATE_FAILED", "JOB_STATE_DONE"
    ] = "JOB_STATE_RUNNING"
    shuffle_mode: Literal["SERVICE", "DISK"] = "SERVICE"
    anomaly_flags: list[AnomalyFlag] = Field(default_factory=list)


class PubSubDetails(BaseModel):
    ack_latency_ms: float
    retention_days: int
    active_subscriptions: int
    messages_per_sec: float


class DataflowDetails(BaseModel):
    job_id: str
    job_name: str
    state: str
    worker_count: int
    max_workers: int
    min_workers: int
    shuffle_mode: str
    throughput_elements_per_sec: float


class BigQueryDetails(BaseModel):
    rows_per_hour: int
    partition_field: str
    clustering_fields: list[str]
    cache_hit_rate_pct: float
    slot_utilization_pct: float


class LookerDetails(BaseModel):
    active_dashboards: int
    active_users: int
    query_p95_seconds: float
    cache_hit_rate_pct: float


class MetricsSnapshotResponse(BaseModel):
    current: MetricsSnapshot
    pubsub_details: PubSubDetails
    dataflow_details: DataflowDetails
    bigquery_details: BigQueryDetails
    looker_details: LookerDetails


class LogEntry(BaseModel):
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    level: Literal["INFO", "WARN", "ERROR"]
    service: Literal["Dataflow", "Pub/Sub", "BigQuery", "Looker", "IAM", "Monitoring"]
    message: str
    resource_labels: dict[str, str] = Field(default_factory=dict)
    trace_id: str | None = None


class ServiceCost(BaseModel):
    service_name: str
    cost_usd: float
    pct_of_total: float


class OptimizationSaving(BaseModel):
    name: str
    description: str
    saving_pct: float
    saving_metric: str
    status: Literal["active", "inactive", "error"]


class HourlyTrend(BaseModel):
    hours: list[str]
    total_usd: list[float]
    bigquery_usd: list[float]
    dataflow_usd: list[float]


class FinOpsCostsResponse(BaseModel):
    daily_total_usd: float
    daily_delta_pct: float
    cost_by_service: list[ServiceCost]
    savings_by_optimization: list[OptimizationSaving]
    hourly_trend_12h: HourlyTrend


class ServiceAccount(BaseModel):
    email: str
    name: str
    status: str


class IAMBinding(BaseModel):
    role: str
    principal: str
    scope: str
    status: Literal["active", "violation", "excess_privilege"]
    color_hint: str


class AuthFlow(BaseModel):
    from_service: str
    to_service: str
    permission: str
    color_hint: str


class ComplianceViolation(BaseModel):
    control: str
    severity: Literal["critical", "high", "medium"]
    description: str
    remediation: str


class ComplianceStatus(BaseModel):
    audit_logs_enabled: bool
    org_policy_location: str
    vpc_sc_perimeter_active: bool
    cmek_configured: bool
    violations: list[ComplianceViolation] = Field(default_factory=list)


class IAMSecurityResponse(BaseModel):
    service_accounts: list[ServiceAccount]
    bindings: list[IAMBinding]
    authorization_flows: list[AuthFlow]
    compliance: ComplianceStatus


class AgentContext(BaseModel):
    project_id: str
    metrics_snapshot: MetricsSnapshot | None = None
    anomaly_flags: list[AnomalyFlag] | None = None
    additional_context: dict[str, Any] = Field(default_factory=dict)


class AgentExecuteRequest(BaseModel):
    agent_id: Literal["anomaly_correlator", "finops_optimizer", "iam_auditor"]
    context: AgentContext
    stream: bool = True


class AgentFinalOutput(BaseModel):
    summary: str
    root_cause: str | None = None
    confidence: float | None = None
    remediation_steps: list[str] = Field(default_factory=list)
    estimated_impact: str | None = None


class AgentStreamEvent(BaseModel):
    event_type: Literal["token", "tool_call", "tool_result", "final"]
    content: str | None = None
    tool_name: str | None = None
    tool_result: dict[str, Any] | None = None
    final_output: AgentFinalOutput | None = None
