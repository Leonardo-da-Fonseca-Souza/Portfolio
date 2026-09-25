import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Imports routes
from routes import metrics, logs, finops, security, agents

app = FastAPI(
    title="GCP Data Pipeline Monitoring & Agentic Observability API",
    description="Backend API Gateway para telemetria em tempo real, FinOps e auditoria IAM agêntica",
    version="1.0.0",
)

# CORS configuration
origins_str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
origins = [o.strip() for o in origins_str.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(metrics.router, prefix="/api/v1/metrics", tags=["Metrics"])
app.include_router(logs.router, prefix="/api/v1/logs", tags=["Logs"])
app.include_router(finops.router, prefix="/api/v1/finops", tags=["FinOps"])
app.include_router(security.router, prefix="/api/v1/security", tags=["Security & IAM"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["Agents"])


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "gcp-pipeline-monitoring-backend",
        "region": os.getenv("GCP_REGION", "southamerica-east1"),
    }


if __name__ == "__main__":
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", "8000"))
    uvicorn.run("main:app", host=host, port=port, reload=True)
