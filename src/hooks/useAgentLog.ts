import { useState, useEffect } from 'react';

export interface AgentLogMessage {
  text: string;
  delay?: number;
}

export function useAgentLog(messages: AgentLogMessage[], active: boolean): AgentLogMessage[] {
  const [logs, setLogs] = useState<AgentLogMessage[]>([]);

  useEffect(() => {
    if (!active || !Array.isArray(messages)) {
      const t = setTimeout(() => setLogs([]), 0);
      return () => clearTimeout(t);
    }

    const reset = setTimeout(() => setLogs([]), 0);
    const timers = messages.map((m) =>
      setTimeout(() => setLogs((prev) => [...prev, m]), m.delay ?? 0),
    );

    return () => {
      clearTimeout(reset);
      timers.forEach(clearTimeout);
    };
  }, [active, messages]);

  return logs;
}

export default useAgentLog;
