import { useEffect, useState } from 'react';
import { IAMSecurityResponse } from '../types';

export function useIAMBindings(projectId = 'demo-gcp-project') {
  const [data, setData] = useState<IAMSecurityResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || '';
    fetch(`${apiBase}/api/v1/security/iam-bindings?project_id=${projectId}`)
      .then((res) => res.json())
      .then((payload: IAMSecurityResponse) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erro ao carregar IAM bindings:', err);
        setLoading(false);
      });
  }, [projectId]);

  return { data, loading };
}
