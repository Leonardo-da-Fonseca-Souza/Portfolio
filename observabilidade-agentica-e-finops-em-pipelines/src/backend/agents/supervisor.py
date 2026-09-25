from typing import Dict, Any
from schemas import AgentContext, AgentFinalOutput


class PipelineSupervisorAgent:
    """Orquestrador principal (Google ADK / LangGraph Supervisor).

    Roteia solicitações do frontend para os agentes especializados
    com base na aba ativa ou presença de anomalias detectadas.
    """

    def __init__(self, model_name: str = "gemini-2.0-flash"):
        self.model_name = model_name

    async def route_and_execute(
        self, tab_context: str, context: AgentContext
    ) -> Dict[str, Any]:
        """Avalia contexto e dispara o grafo de agentes adequado."""
        if context.anomaly_flags and len(context.anomaly_flags) > 0:
            return {
                "route": "anomaly_correlator_agent",
                "status": "executing",
                "model": "gemini-1.5-pro",
            }

        if tab_context == "finops":
            return {
                "route": "finops_agent",
                "status": "executing",
                "model": "gemini-1.5-pro",
            }

        if tab_context == "security":
            return {
                "route": "iam_audit_agent",
                "status": "executing",
                "model": "gemini-1.5-pro",
            }

        return {
            "route": "metrics_agent",
            "status": "executing",
            "model": "gemini-2.0-flash",
        }
