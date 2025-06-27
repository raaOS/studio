import * as admin from 'firebase-admin';

// Ensure the service account JSON is available
if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  console.warn("FIREBASE_SERVICE_ACCOUNT_JSON is not set in .env. Firebase Admin SDK will not be initialized.");
}

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  try {
    const serviceAccountString = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    
    // Check if the string is a valid JSON
    if (!serviceAccountString.trim().startsWith('{')) {
        throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON is not a valid JSON object.");
    }

    const serviceAccount = JSON.parse(serviceAccountString);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin SDK initialized successfully.");
  } catch (error: any) {
    console.error("Firebase Admin SDK initialization error:", error.message);
  }
}

export const adminDb = admin.apps.length ? admin.firestore() : null;
