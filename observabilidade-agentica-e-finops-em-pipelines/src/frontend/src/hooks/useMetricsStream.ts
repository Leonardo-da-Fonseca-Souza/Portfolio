import { useEffect, useState } from 'react';
import { MetricsSnapshot } from '../types';

export function useMetricsStream(projectId = 'demo-gcp-project') {
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Busca snapshot inicial via REST
    fetch(`/api/v1/metrics/snapshot?project_id=${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.current) {
          setMetrics(data.current);
        }
      })
      .catch((err) => console.warn('Falha no snapshot inicial, aguardando SSE:', err));

    // Abre stream de Server-Sent Events
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const eventSource = new EventSource(`${apiBase}/api/v1/metrics/stream?project_id=${projectId}`);

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const payload: MetricsSnapshot = JSON.parse(event.data);
        setMetrics(payload);
      } catch (err) {
        console.error('Erro de parse no payload SSE de métricas:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn('Erro de conexão SSE em /metrics/stream:', err);
      setIsConnected(false);
      setError('Conexão SSE de métricas interrompida. Reconectando...');
    };

    return () => {
      eventSource.close();
    };
  }, [projectId]);

  return { metrics, isConnected, error };
}
