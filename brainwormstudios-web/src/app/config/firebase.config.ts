import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, type Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyB4n_6Xajk5_CAFCEEV8rAf7J1CK_g43Gg',
  authDomain: 'brainwormstudiosweb.firebaseapp.com',
  projectId: 'brainwormstudiosweb',
  storageBucket: 'brainwormstudiosweb.firebasestorage.app',
  messagingSenderId: '582195894388',
  appId: '1:582195894388:web:5f1d4a96ed32606a2c5921',
  measurementId: 'G-KKBCZNFZ8Y'
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics | null = typeof window !== 'undefined' ? getAnalytics(app) : null;
