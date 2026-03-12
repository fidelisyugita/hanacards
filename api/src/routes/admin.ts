import { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]),
});

export async function adminRoutes(app: FastifyInstance) {
  // GET /admin/orders — list all orders
  app.get(
    "/admin/orders",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      // Optional: fastify route schema for query string e.g., ?status=PENDING
      const { status } = request.query as { status?: string };

      const where = status ? { status: status as any } : {};

      const orders = await app.prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          items: { include: { product: true } },
        },
      });

      // Fetch user emails for the orders
      const userIds = [...new Set(orders.map((o) => o.userId))];
      const users = await app.prisma.user.findMany({
        where: { uid: { in: userIds } },
        select: { uid: true, email: true, displayName: true },
      });
      const userMap = new Map(users.map((u) => [u.uid, u]));

      // Attach user info to response
      const ordersWithUsers = orders.map((o) => ({
        ...o,
        user: userMap.get(o.userId),
      }));

      return reply.send(ordersWithUsers);
    }
  );

  // PUT /admin/orders/:id/status — update an order's status
  app.put<{ Params: { id: string } }>(
    "/admin/orders/:id/status",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      const { status } = updateOrderStatusSchema.parse(request.body);

      try {
        const order = await app.prisma.order.update({
          where: { id: request.params.id },
          data: { status },
          include: { items: { include: { product: true } } },
        });
        return reply.send(order);
      } catch {
        return reply.status(404).send({ message: "Order not found" });
      }
    }
  );

  // GET /admin/users — list all users
  app.get(
    "/admin/users",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      const users = await app.prisma.user.findMany({
        orderBy: { createdAt: "desc" },
      });
      return reply.send(users);
    }
  );
}
