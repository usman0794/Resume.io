// Dummy/mock social auth — no real Firebase/Google backend call.
// Backend connection intentionally removed; wire up real Firebase auth here later.
export interface SocialAuthResult {
  idToken: string;
  user: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
}

export const signInWithGoogle = async (): Promise<SocialAuthResult> => {
  await new Promise(r => setTimeout(r, 500));
  return {
    idToken: 'mock-google-id-token',
    user: {
      uid: 'mock-uid',
      email: 'demo@example.com',
      displayName: 'Demo User',
      photoURL: null,
    },
  };
};
