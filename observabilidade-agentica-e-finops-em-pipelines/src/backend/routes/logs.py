import asyncio
from datetime import datetime
import random
from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from schemas import LogEntry

router = APIRouter()

SAMPLE_LOG_MESSAGES = [
    ("INFO", "Dataflow", "Autoscaling: Worker pool resized from 8 to 12 vCPUs due to throughput spike."),
    ("INFO", "Pub/Sub", "Subscription pipeline-events-sub ack latency P95 steady at 18ms."),
    ("WARN", "Dataflow", "High memory pressure on worker df-worker-87a1. Triggering GC sweep."),
    ("INFO", "BigQuery", "Streaming insert batch committed: 50,000 rows inserted in dataset pipeline_data."),
    ("INFO", "Looker", "Dashboard query cache hit for executive-overview dashboard."),
    ("WARN", "Pub/Sub", "Undelivered backlog exceeded 2,000 messages on topic pipeline-events."),
    ("INFO", "IAM", "Service Account sa-dataflow-worker token refreshed successfully via ADC."),
    ("ERROR", "Dataflow", "Transient connection timeout on BigQuery sink connector. Retrying (attempt 1/3)."),
    ("INFO", "Monitoring", "Cloud Monitoring metric alert 'Latency P99' resolved."),
]


async def log_event_generator(project_id: str, severity_min: str):
    """Gera logs do Cloud Logging em tempo real via SSE."""
    while True:
        level, service, message = random.choice(SAMPLE_LOG_MESSAGES)

        # Filtro básico por severidade
        if severity_min == "ERROR" and level != "ERROR":
            await asyncio.sleep(1.5)
            continue
        if severity_min == "WARN" and level == "INFO":
            await asyncio.sleep(1.5)
            continue

        entry = LogEntry(
            timestamp=datetime.utcnow(),
            level=level,  # type: ignore
            service=service,  # type: ignore
            message=message,
            resource_labels={
                "project_id": project_id,
                "region": "southamerica-east1",
                "job_id": "2026-09-02_14_30_00-18492049102",
            },
            trace_id=f"projects/{project_id}/traces/{random.randint(10000000, 99999999)}",
        )

        yield f"data: {entry.model_dump_json()}\n\n"
        await asyncio.sleep(random.uniform(1.2, 2.5))


@router.get("/stream")
async def stream_logs(
    project_id: str = Query("demo-gcp-project"),
    severity_min: str = Query("INFO"),
):
    """Endpoint SSE para LogStream em tempo real."""
    return StreamingResponse(
        log_event_generator(project_id, severity_min),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
