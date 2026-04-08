const SESSION_KEY = 'resume.io_resume_session';

export interface ResumeSessionPayload {
  flow: 'manual' | 'ai';
  [key: string]: unknown;
}

export const saveSession = (payload: ResumeSessionPayload): void => {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(payload));
  } catch (e: any) {
    console.warn('[resumeSession] Could not save session:', e.message);
  }
};

export const blobUrlToBase64 = async (blobUrl: string | null): Promise<string | null> => {
  if (!blobUrl) return null;
  try {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

export const base64ToBlobUrl = (base64DataUrl: string | null): string | null => {
  if (!base64DataUrl) return null;
  try {
    const [header, data] = base64DataUrl.split(',');
    const mime = header.match(/:(.*?);/)![1];
    const bytes = atob(data);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    return URL.createObjectURL(new Blob([arr], { type: mime }));
  } catch {
    return null;
  }
};

export const loadSession = (): ResumeSessionPayload | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as ResumeSessionPayload) : null;
  } catch {
    return null;
  }
};

export const clearSession = (): void => {
  try { sessionStorage.removeItem(SESSION_KEY); } catch { /* silent */ }
};
