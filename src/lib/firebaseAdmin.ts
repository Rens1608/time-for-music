import * as admin from 'firebase-admin';

// Initialize the Firebase Admin SDK only once in development and production.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace escaped newline characters with actual newline characters
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

// Export the Firestore database
const db = admin.firestore();
export { admin, db };