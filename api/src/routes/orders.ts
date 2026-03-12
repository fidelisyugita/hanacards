import { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyToken } from "../middleware/auth.js";

const orderItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
  address: z
    .object({
      name: z.string(),
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      postalCode: z.string(),
      country: z.string(),
    })
    .optional(),
});

export async function orderRoutes(app: FastifyInstance) {
  // POST /orders — place an order (auth required)
  app.post(
    "/orders",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const { items, address } = createOrderSchema.parse(request.body);
      const userId = request.user!.uid;

      // Fetch all products in one query and compute total
      const productIds = items.map((i) => i.productId);
      const products = await app.prisma.product.findMany({
        where: { id: { in: productIds }, active: true },
      });

      if (products.length !== productIds.length) {
        return reply.status(400).send({ message: "One or more products not found or unavailable" });
      }

      const productMap = new Map(products.map((p) => [p.id, p]));

      const total = items.reduce((sum, item) => {
        const product = productMap.get(item.productId)!;
        return sum + product.price * item.quantity;
      }, 0);

      const order = await app.prisma.order.create({
        data: {
          userId,
          total,
          address: address ?? undefined,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: productMap.get(item.productId)!.price,
            })),
          },
        },
        include: { items: { include: { product: true } } },
      });

      return reply.status(201).send(order);
    }
  );

  // GET /orders — get my orders (auth required)
  app.get("/orders", { preHandler: [verifyToken] }, async (request, reply) => {
    const orders = await app.prisma.order.findMany({
      where: { userId: request.user!.uid },
      orderBy: { createdAt: "desc" },
      include: { items: { include: { product: true } } },
    });
    return reply.send(orders);
  });

  // GET /orders/:id — get single order (auth required, user must own it)
  app.get<{ Params: { id: string } }>(
    "/orders/:id",
    { preHandler: [verifyToken] },
    async (request, reply) => {
      const order = await app.prisma.order.findFirst({
        where: { id: request.params.id, userId: request.user!.uid },
        include: { items: { include: { product: true } } },
      });
      if (!order) {
        return reply.status(404).send({ message: "Order not found" });
      }
      return reply.send(order);
    }
  );
}
