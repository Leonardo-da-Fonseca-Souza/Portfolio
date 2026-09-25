import { useEffect, useState } from 'react';
import { LogEntry } from '../types';

export function useLogStream(projectId = 'demo-gcp-project', severityMin = 'INFO') {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    const eventSource = new EventSource(
      `${apiBase}/api/v1/logs/stream?project_id=${projectId}&severity_min=${severityMin}`
    );

    eventSource.onopen = () => setIsConnected(true);

    eventSource.onmessage = (event) => {
      try {
        const payload: LogEntry = JSON.parse(event.data);
        setLogs((prev) => [payload, ...prev.slice(0, 49)]); // Mantém 50 mais recentes
      } catch (err) {
        console.error('Erro de parse no log SSE:', err);
      }
    };

    eventSource.onerror = () => setIsConnected(false);

    return () => eventSource.close();
  }, [projectId, severityMin]);

  return { logs, isConnected };
}
