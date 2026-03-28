import { useEffect, useRef, useState } from 'react';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

/**
 * useAutoSave
 * A simple debounce-based auto-save hook.
 * - Debounces save calls by 500ms
 * - Calls the provided save function with the latest value
 * - Exposes a lightweight save status for UI feedback
 */
export function useAutoSave<T>(
  value: T,
  saveFn: (payload: T) => Promise<void>,
  deps: React.DependencyList = []
): { status: SaveStatus; error?: string } {
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [error, setError] = useState<string | undefined>(undefined);
  // Persist a stable reference to the latest value to avoid stale closures
  const latestValue = useRef<T>(value);
  useEffect(() => {
    latestValue.current = value;
  }, [value]);

  useEffect(() => {
    // If value changes, schedule a save after 500ms
    const t = setTimeout(async () => {
      try {
        setStatus('saving');
        setError(undefined);
        await saveFn(latestValue.current);
        setStatus('saved');
        // small delay to allow UI to reflect saved state before possible next saves
        setTimeout(() => {
          // return to idle after a short period to avoid perpetual "saved" badge
          setStatus('idle');
        }, 1000);
      } catch (e) {
        const msg = (e as any)?.message || 'Save failed';
        setError(msg);
        setStatus('error');
      }
    }, 500);

    return () => {
      clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveFn, ...deps, value]);

  return { status, error };
}
