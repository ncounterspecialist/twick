import { useState, useCallback } from 'react';

const TOAST_DURATION_MS = 2200;

export function useToast() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((t) => (t === message ? null : t)), TOAST_DURATION_MS);
  }, []);

  return { toast, showToast };
}
