import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import * as admin from "firebase-admin";

declare module "fastify" {
  interface FastifyInstance {
    firebase: admin.app.App;
  }
}

const firebasePlugin: FastifyPluginAsync = fp(async (server) => {
  if (!admin.apps.length) {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace \\n with actual newlines in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
    server.decorate("firebase", app);
  } else {
    server.decorate("firebase", admin.apps[0]!);
  }
});

export default firebasePlugin;
