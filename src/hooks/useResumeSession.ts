import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadSession, clearSession } from '@/utils/resumeSession';
import type { AppDispatch } from '@/store';

export function useResumeSession(onRestored?: (flow: string) => void): void {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const session = loadSession();
    if (!session) return;

    clearSession();
    onRestored?.(session.flow);
  }, [dispatch, onRestored]);
}

export default useResumeSession;
