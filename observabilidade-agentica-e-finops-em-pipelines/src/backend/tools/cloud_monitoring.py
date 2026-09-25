from typing import Dict, Any


class CloudMonitoringTool:
    """Ferramenta de integração com a API Cloud Monitoring v3."""

    def __init__(self, project_id: str = "demo-gcp-project"):
        self.project_id = project_id

    async def fetch_timeseries(self, metric_type: str) -> Dict[str, Any]:
        """Consulta métricas de série temporal."""
        return {
            "metric": metric_type,
            "project_id": self.project_id,
            "status": "success",
            "datapoints": [128450, 129100, 131200],
        }
