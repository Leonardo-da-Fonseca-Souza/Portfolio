import { useEffect, useState } from 'react';
import { FinOpsCostsResponse } from '../types';

export function useFinOps(projectId = 'demo-gcp-project') {
  const [data, setData] = useState<FinOpsCostsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${apiBase}/api/v1/finops/costs?project_id=${projectId}`)
      .then((res) => res.json())
      .then((payload: FinOpsCostsResponse) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao buscar dados FinOps:', err);
        setLoading(false);
      });
  }, [projectId]);

  return { data, loading };
}
