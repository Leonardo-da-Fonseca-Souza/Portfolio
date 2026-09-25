from fastapi import APIRouter, Query
from schemas import (
    FinOpsCostsResponse,
    ServiceCost,
    OptimizationSaving,
    HourlyTrend,
)

router = APIRouter()


@router.get("/costs", response_model=FinOpsCostsResponse)
async def get_finops_costs(
    project_id: str = Query("demo-gcp-project"),
    days: int = Query(30),
):
    """Retorna análise de custos FinOps e otimizações ativas."""
    return FinOpsCostsResponse(
        daily_total_usd=142.80,
        daily_delta_pct=-14.2,
        cost_by_service=[
            ServiceCost(service_name="Cloud Dataflow", cost_usd=74.50, pct_of_total=52.2),
            ServiceCost(service_name="BigQuery Storage & Compute", cost_usd=42.10, pct_of_total=29.5),
            ServiceCost(service_name="Cloud Pub/Sub", cost_usd=16.40, pct_of_total=11.5),
            ServiceCost(service_name="Cloud Monitoring & Logging", cost_usd=6.80, pct_of_total=4.8),
            ServiceCost(service_name="IAM & Security Command Center", cost_usd=3.00, pct_of_total=2.0),
        ],
        savings_by_optimization=[
            OptimizationSaving(
                name="BigQuery Particionamento & Clustering",
                description="Redução de busca de dados em scans diários",
                saving_pct=68.0,
                saving_metric="bytes escaneados",
                status="active",
            ),
            OptimizationSaving(
                name="Dataflow Worker Autoscaling",
                description="Redimensionamento dinâmico de vCPUs conforme demanda",
                saving_pct=31.0,
                saving_metric="vCPU horas",
                status="active",
            ),
            OptimizationSaving(
                name="Dataflow Shuffle Service",
                description="Uso de shuffle gerenciado em memória invés de disco local",
                saving_pct=23.0,
                saving_metric="custo de I/O de disco",
                status="active",
            ),
        ],
        hourly_trend_12h=HourlyTrend(
            hours=[f"{h:02d}:00" for h in range(12)],
            total_usd=[11.2, 12.5, 14.8, 15.2, 13.9, 12.1, 10.8, 11.5, 13.0, 14.2, 13.8, 12.4],
            bigquery_usd=[3.2, 3.8, 4.5, 4.8, 4.2, 3.6, 3.1, 3.5, 3.9, 4.2, 4.0, 3.8],
            dataflow_usd=[6.5, 7.2, 8.8, 8.9, 8.2, 7.1, 6.3, 6.7, 7.6, 8.4, 8.2, 7.2],
        ),
    )
