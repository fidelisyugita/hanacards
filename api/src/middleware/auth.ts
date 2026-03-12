import { FastifyRequest, FastifyReply } from "fastify";
import admin from "firebase-admin";
import { AuthUser } from "../types/index.js";

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthUser;
  }
}

/**
 * Verifies Firebase ID token from Authorization header.
 * Attaches decoded user info and DB role to request.user
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
    
    // Look up role in Database
    const dbUser = await request.server.prisma.user.findUnique({
      where: { uid: decoded.uid },
      select: { role: true }
    });

    request.user = {
      uid: decoded.uid,
      email: decoded.email,
      role: dbUser?.role ?? "CUSTOMER", // default to CUSTOMER if not yet in DB
    };
  } catch (err: any) {
    console.error("Firebase verifyIdToken error:", err.message);
    request.log.error(err);
    return reply.status(401).send({ message: "Invalid or expired token", error: err.message });
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
  if (request.user?.role !== "ADMIN") {
    return reply.status(403).send({ message: "Admin access required" });
  }
}
