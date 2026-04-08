// Firebase config — placeholder, currently unused.
// Social login is fully mocked (see ./socialAuth.ts) so the app has no live
// backend connection. Wire this up with real credentials + firebase/app +
// firebase/auth initialization when the real backend is implemented.

export const firebaseConfig = {
  apiKey           : import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain       : import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId        : import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket    : import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId            : import.meta.env.VITE_FIREBASE_APP_ID ?? '',
};

export default firebaseConfig;
