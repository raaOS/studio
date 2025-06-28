import * as admin from 'firebase-admin';

// Ensure the service account JSON is available
if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  console.warn("FIREBASE_SERVICE_ACCOUNT_JSON is not set. Firebase Admin SDK will not be initialized.");
}

// Initialize the app only if it hasn't been initialized yet, and the config is present.
if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    
    // Check if the string is a valid JSON before parsing
    if (!serviceAccountString.trim().startsWith('{')) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not a valid JSON object. It should start with '{'.");
    }

    const serviceAccount = JSON.parse(serviceAccountString);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error: any) {
    console.error("Firebase Admin SDK initialization error:", error.message);
    // You might want to handle this more gracefully depending on your app's needs.
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
