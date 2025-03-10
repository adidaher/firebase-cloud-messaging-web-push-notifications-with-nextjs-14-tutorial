import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyC71bujQoeP12S058pnrswzCHINdmSg2ek",
  authDomain: "barberappadi.firebaseapp.com",
  projectId: "barberappadi",
  storageBucket: "barberappadi.firebasestorage.app",
  messagingSenderId: "244848390459",
  appId: "1:244848390459:web:8d72f66e603a245bf1471e",
  measurementId: "G-CNY5YP80C9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
