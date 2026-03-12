import { FastifyRequest, FastifyReply } from "fastify";
import * as admin from "firebase-admin";
import { AuthUser } from "../types/index.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthUser;
  }
}

/**
 * Verifies Firebase ID token from Authorization header.
 * Attaches decoded user info to request.user
 */
export async function verifyToken(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.status(401).send({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    request.user = {
      uid: decoded.uid,
      email: decoded.email,
      isAdmin: decoded.admin === true,
    };
  } catch {
    return reply.status(401).send({ message: "Invalid or expired token" });
  }
}

/**
 * Requires request.user to be an admin.
 * Must be used after verifyToken.
 */
export async function requireAdmin(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  if (!request.user?.isAdmin) {
    return reply.status(403).send({ message: "Admin access required" });
  }
}
