import { initializeApp, getApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { init } from 'next-firebase-auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

import { routes } from '@constants';

import type { FirebaseOptions } from 'firebase/app';

const { default: { root, auth } } = routes;

export const firebaseClientInitConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
};

export const initAuth = () => {
  init({
    authPageURL: auth,
    appPageURL: root,
    loginAPIEndpoint: '/api/login',
    logoutAPIEndpoint: '/api/logout',
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL ?? '',
        privateKey: process.env.FIREBASE_PRIVATE_KEY ?? '',
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ?? '',
    },
    firebaseClientInitConfig,
    cookies: {
      name: 'BeatBar',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NEXT_PUBLIC_COOKIE_SECURE,
      signed: true,
    },
  });
};

function createFirebaseApp(config: FirebaseOptions) {
  try {
    return getApp();
  } catch {
    return initializeApp(config);
  }
}

const firebaseApp = createFirebaseApp(firebaseClientInitConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const functions = getFunctions(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
