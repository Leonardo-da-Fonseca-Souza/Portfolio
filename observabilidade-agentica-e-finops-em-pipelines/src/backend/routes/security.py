from fastapi import APIRouter, Query
from schemas import (
    IAMSecurityResponse,
    ServiceAccount,
    IAMBinding,
    AuthFlow,
    ComplianceStatus,
    ComplianceViolation,
)

router = APIRouter()


@router.get("/iam-bindings", response_model=IAMSecurityResponse)
async def get_iam_bindings(
    project_id: str = Query("demo-gcp-project"),
):
    """Retorna estado das IAM Bindings, Service Accounts e compliance do pipeline GCP."""
    return IAMSecurityResponse(
        service_accounts=[
            ServiceAccount(
                email=f"sa-dataflow-worker@{project_id}.iam.gserviceaccount.com",
                name="Dataflow Worker Service Account",
                status="Active",
            ),
            ServiceAccount(
                email=f"sa-pubsub-publisher@{project_id}.iam.gserviceaccount.com",
                name="Pub/Sub Publisher Service Account",
                status="Active",
            ),
            ServiceAccount(
                email=f"sa-looker-analytics@{project_id}.iam.gserviceaccount.com",
                name="Looker Analytics Service Account",
                status="Active",
            ),
        ],
        bindings=[
            IAMBinding(
                role="roles/pubsub.subscriber",
                principal=f"sa-dataflow-worker@{project_id}.iam.gserviceaccount.com",
                scope="Pub/Sub Subscription: pipeline-events-sub",
                status="active",
                color_hint="#10B981",
            ),
            IAMBinding(
                role="roles/bigquery.dataEditor",
                principal=f"sa-dataflow-worker@{project_id}.iam.gserviceaccount.com",
                scope="BigQuery Dataset: pipeline_data",
                status="active",
                color_hint="#10B981",
            ),
            IAMBinding(
                role="roles/bigquery.dataViewer",
                principal=f"sa-looker-analytics@{project_id}.iam.gserviceaccount.com",
                scope="BigQuery Dataset: pipeline_data",
                status="active",
                color_hint="#10B981",
            ),
            IAMBinding(
                role="roles/pubsub.publisher",
                principal=f"sa-pubsub-publisher@{project_id}.iam.gserviceaccount.com",
                scope="Pub/Sub Topic: pipeline-events",
                status="active",
                color_hint="#10B981",
            ),
        ],
        authorization_flows=[
            AuthFlow(
                from_service="App Producer",
                to_service="Cloud Pub/Sub",
                permission="pubsub.topics.publish",
                color_hint="#6366F1",
            ),
            AuthFlow(
                from_service="Cloud Dataflow Worker",
                to_service="Cloud Pub/Sub",
                permission="pubsub.subscriptions.consume",
                color_hint="#3B82F6",
            ),
            AuthFlow(
                from_service="Cloud Dataflow Worker",
                to_service="BigQuery Dataset",
                permission="bigquery.tables.insertData",
                color_hint="#06B6D4",
            ),
            AuthFlow(
                from_service="Looker BI",
                to_service="BigQuery Dataset",
                permission="bigquery.jobs.create",
                color_hint="#8B5CF6",
            ),
        ],
        compliance=ComplianceStatus(
            audit_logs_enabled=True,
            org_policy_location="southamerica-east1",
            vpc_sc_perimeter_active=True,
            cmek_configured=True,
            violations=[
                ComplianceViolation(
                    control="Org Policy - Allowed Locations",
                    severity="medium",
                    description="Bucket de backup temporário detectado na região us-central1 (deve ser southamerica-east1).",
                    remediation="Remanejar bucket para a região southamerica-east1 conforme política org/location.",
                )
            ],
        ),
    )
