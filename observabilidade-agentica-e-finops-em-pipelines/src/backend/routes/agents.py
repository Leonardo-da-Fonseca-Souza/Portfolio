import asyncio
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from schemas import (
    AgentExecuteRequest,
    AgentStreamEvent,
    AgentFinalOutput,
)

router = APIRouter()


async def agent_execution_stream(request: AgentExecuteRequest):
    """Executa o agente solicitado e emite tokens/ações via SSE."""
    agent_id = request.agent_id

    # 1. Evento inicial: Tool Call
    yield f"data: {AgentStreamEvent(event_type='tool_call', tool_name='cloud_monitoring_tool', content='Consultando métricas de latência P99 e worker autoscaling...').model_dump_json()}\n\n"
    await asyncio.sleep(0.8)

    # 2. Evento: Tool Result
    yield f"data: {AgentStreamEvent(event_type='tool_result', tool_name='cloud_monitoring_tool', tool_result={'latency_p99_ms': 420.5, 'backlog_msgs': 5400, 'vcpus': 12}).model_dump_json()}\n\n"
    await asyncio.sleep(0.8)

    # 3. Tokens de pensamento do LLM
    if agent_id == "anomaly_correlator":
        tokens = [
            "Analisando ",
            "correlação ",
            "entre ",
            "pico ",
            "de ",
            "backlog ",
            "no ",
            "Pub/Sub ",
            "e ",
            "aumento ",
            "de ",
            "latência ",
            "no ",
            "Dataflow...\n",
            "Identificado ",
            "gargalo ",
            "na ",
            "etapa ",
            "de ",
            "escrita ",
            "do ",
            "BigQuery ",
            "devido ",
            "ao ",
            "limite ",
            "de ",
            "max_workers ",
            "fixado ",
            "em ",
            "12.",
        ]
        for token in tokens:
            yield f"data: {AgentStreamEvent(event_type='token', content=token).model_dump_json()}\n\n"
            await asyncio.sleep(0.08)

        final_out = AgentFinalOutput(
            summary="Anomalia de latência correlacionada a teto de workers do Dataflow.",
            root_cause="O job do Dataflow atingiu o limite de maxNumWorkers (12) durante o pico de vazão de 130k eventos/s do Pub/Sub.",
            confidence=0.94,
            remediation_steps=[
                "Elevar maxNumWorkers do Dataflow de 12 para 24 vCPUs no comando gcloud dataflow jobs run.",
                "Verificar se o BigQuery Streaming Buffer está operando dentro da quota de throughput.",
                "Ativar alerta preventivo quando backlog Pub/Sub ultrapassar 4.000 mensagens.",
            ],
            estimated_impact="Redução imediata da latência P99 de 420ms para < 250ms e esvaziamento do backlog em 90 segundos.",
        )
    elif agent_id == "finops_optimizer":
        final_out = AgentFinalOutput(
            summary="Recomendação FinOps de otimização de cluster BigQuery e Dataflow.",
            root_cause="Job Dataflow sem Shuffle Service ativado e tabelas BigQuery sem particionamento por data de ingestão.",
            confidence=0.96,
            remediation_steps=[
                "Habilitar Shuffle Service no Dataflow pipeline options (`--experiments=use_runner_v2`).",
                "Re-criar tabela BigQuery com PARTITION BY DATE(ingestion_timestamp) e CLUSTER BY event_type.",
            ],
            estimated_impact="Economia projetada de $42.00/dia (-34% do custo diário total de processamento).",
        )
    else:  # iam_auditor
        final_out = AgentFinalOutput(
            summary="Auditoria de segurança IAM realizada sob princípio do menor privilégio.",
            root_cause="Bucket de backup em região divergente da política da organização.",
            confidence=0.98,
            remediation_steps=[
                "Remover permissões excessivas e re-alocar bucket em southamerica-east1.",
            ],
            estimated_impact="100% de conformidade com baselines IAM e políticas organizacionais GCP.",
        )

    yield f"data: {AgentStreamEvent(event_type='final', final_output=final_out).model_dump_json()}\n\n"


@router.post("/execute")
async def execute_agent(request: AgentExecuteRequest):
    """Aciona agente agêntico sob demanda (com suporte a streaming SSE ou JSON final)."""
    if request.stream:
        return StreamingResponse(
            agent_execution_stream(request),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        )
    else:
        # Retorno direto não-streamed
        return AgentFinalOutput(
            summary="Análise executada com sucesso",
            confidence=0.95,
            remediation_steps=["Verificar dashboard de telemetria"],
        )
