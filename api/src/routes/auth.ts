import { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyToken } from "../middleware/auth.js";

const updateProfileSchema = z.object({
  displayName: z.string().min(1),
});

const updateAddressSchema = z.object({
  name: z.string(),
  line1: z.string(),
  line2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

export async function authRoutes(app: FastifyInstance) {
  // POST /auth/register
  // Called by the client right after Firebase signup (or login) to ensure the user exists in DB
  app.post(
    "/auth/register",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { uid, email } = request.user!;

      const user = await app.prisma.user.upsert({
        where: { uid },
        update: {}, // if exists, do nothing (or could update email if it changed)
        create: {
          uid,
          email: email ?? "",
          role: "CUSTOMER",
        },
      });

      return reply.send(user);
    }
  );

  // GET /me — get current user profile
  app.get("/me", { preHandler: [verifyToken] }, async (request, reply) => {
    const user = await app.prisma.user.findUnique({
      where: { uid: request.user!.uid },
    });
    if (!user) {
      return reply.status(404).send({ message: "User not found in DB" });
    }
    return reply.send(user);
  });

  // PUT /me/profile
  app.put(
    "/me/profile",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { displayName } = updateProfileSchema.parse(request.body);
      const user = await app.prisma.user.update({
        where: { uid: request.user!.uid },
        data: { displayName },
      });
      return reply.send(user);
    }
  );

  // PUT /me/address
  app.put(
    "/me/address",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const address = updateAddressSchema.parse(request.body);
      const user = await app.prisma.user.update({
        where: { uid: request.user!.uid },
        data: { address },
      });
      return reply.send(user);
    }
  );

  // GET /me/cart
  app.get("/me/cart", { preHandler: [verifyToken] }, async (request, reply) => {
    const items = await app.prisma.cartItem.findMany({
      where: { userId: request.user!.uid },
      include: { product: true },
    });
    return reply.send(items);
  });

  // POST /me/cart — upsert a cart item
  app.post(
    "/me/cart",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { productId, quantity } = cartItemSchema.parse(request.body);
      const userId = request.user!.uid;

      const item = await app.prisma.cartItem.upsert({
        where: { userId_productId: { userId, productId } },
        update: { quantity },
        create: { userId, productId, quantity },
        include: { product: true },
      });

      return reply.send(item);
    }
  );

  // DELETE /me/cart/:productId — remove a single item
  app.delete<{ Params: { productId: string } }>(
    "/me/cart/:productId",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      await app.prisma.cartItem.delete({
        where: {
          userId_productId: {
            userId: request.user!.uid,
            productId: request.params.productId,
          },
        },
      });
      return reply.send({ message: "Item removed" });
    }
  );

  // DELETE /me/cart — clear entire cart
  app.delete(
    "/me/cart",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      await app.prisma.cartItem.deleteMany({
        where: { userId: request.user!.uid },
      });
      return reply.send({ message: "Cart cleared" });
    }
  );
}
