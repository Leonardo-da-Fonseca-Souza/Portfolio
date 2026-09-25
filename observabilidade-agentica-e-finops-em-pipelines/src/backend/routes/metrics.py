import asyncio
from datetime import datetime
import random
from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from schemas import (
    MetricsSnapshot,
    MetricsSnapshotResponse,
    PubSubDetails,
    DataflowDetails,
    BigQueryDetails,
    LookerDetails,
    AnomalyFlag,
)

router = APIRouter()


async def metrics_event_generator(project_id: str, region: str):
    """Gera eventos SSE de métricas do pipeline GCP a cada 2s."""
    base_throughput = 125000.0
    base_latency = 280.0
    base_workers = 12
    base_backlog = 1200

    while True:
        # Simulação de variações dinâmicas de telemetria
        throughput_variation = random.uniform(-5000, 5000)
        latency_variation = random.uniform(-20, 45)
        backlog_variation = random.randint(-200, 500)

        throughput = max(90000.0, base_throughput + throughput_variation)
        latency_p99 = max(150.0, base_latency + latency_variation)
        backlog = max(0, base_backlog + backlog_variation)

        anomalies: list[AnomalyFlag] = []
        if latency_p99 > 400.0:
            anomalies.append(
                AnomalyFlag(
                    metric="latency_p99_ms",
                    severity="warning" if latency_p99 <= 480 else "error",
                    value=round(latency_p99, 1),
                    threshold=400.0,
                    message="Latência P99 do Dataflow ultrapassou o limiar de alerta.",
                )
            )

        if backlog > 5000:
            anomalies.append(
                AnomalyFlag(
                    metric="pubsub_backlog_messages",
                    severity="warning",
                    value=float(backlog),
                    threshold=5000.0,
                    message="Backlog no Pub/Sub acumulando acima da baseline recomendada.",
                )
            )

        snapshot = MetricsSnapshot(
            timestamp=datetime.utcnow(),
            throughput_events_per_sec=round(throughput, 1),
            latency_p99_ms=round(latency_p99, 1),
            dataflow_worker_count=base_workers,
            pubsub_backlog_messages=backlog,
            dataflow_job_state="JOB_STATE_RUNNING",
            shuffle_mode="SERVICE",
            anomaly_flags=anomalies,
        )

        yield f"data: {snapshot.model_dump_json()}\n\n"
        await asyncio.sleep(2)


@router.get("/stream")
async def stream_metrics(
    project_id: str = Query("demo-gcp-project"),
    region: str = Query("southamerica-east1"),
):
    """Endpoint Server-Sent Events (SSE) para métricas em tempo real."""
    return StreamingResponse(
        metrics_event_generator(project_id, region),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.get("/snapshot", response_model=MetricsSnapshotResponse)
async def get_metrics_snapshot(
    project_id: str = Query("demo-gcp-project"),
    region: str = Query("southamerica-east1"),
):
    """Snapshot inicial estático para hidratação da interface."""
    current = MetricsSnapshot(
        timestamp=datetime.utcnow(),
        throughput_events_per_sec=128450.0,
        latency_p99_ms=284.5,
        dataflow_worker_count=12,
        pubsub_backlog_messages=1240,
        dataflow_job_state="JOB_STATE_RUNNING",
        shuffle_mode="SERVICE",
        anomaly_flags=[],
    )

    return MetricsSnapshotResponse(
        current=current,
        pubsub_details=PubSubDetails(
            ack_latency_ms=18.4,
            retention_days=7,
            active_subscriptions=4,
            messages_per_sec=128450.0,
        ),
        dataflow_details=DataflowDetails(
            job_id="2026-09-02_14_30_00-18492049102",
            job_name="pipeline-events-streaming-v3",
            state="JOB_STATE_RUNNING",
            worker_count=12,
            max_workers=32,
            min_workers=4,
            shuffle_mode="SERVICE",
            throughput_elements_per_sec=128450.0,
        ),
        bigquery_details=BigQueryDetails(
            rows_per_hour=462420000,
            partition_field="ingestion_date",
            clustering_fields=["event_type", "user_region"],
            cache_hit_rate_pct=94.2,
            slot_utilization_pct=62.8,
        ),
        looker_details=LookerDetails(
            active_dashboards=8,
            active_users=42,
            query_p95_seconds=1.8,
            cache_hit_rate_pct=88.5,
        ),
    )
