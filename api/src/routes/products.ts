import { FastifyInstance } from "fastify";
import { z } from "zod";
import { verifyToken, requireAdmin } from "../middleware/auth.js";

const createProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.enum(["Friendship", "Love", "Birthday", "Packs", "Anniversary", "Thank You", "Congratulations", "Sympathy"]),
  primaryImage: z.string().min(1),
  hoverImage: z.string().min(1),
  stock: z.number().int().nonnegative().default(0),
});

const updateProductSchema = createProductSchema.partial().extend({
  active: z.boolean().optional(),
});

export async function productRoutes(app: FastifyInstance) {
  // GET /products — public
  app.get("/products", async (request, reply) => {
    const products = await app.prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
    });
    return reply.send(products);
  });

  // GET /products/:id — public
  app.get<{ Params: { id: string } }>("/products/:id", async (request, reply) => {
    const product = await app.prisma.product.findUnique({
      where: { id: request.params.id },
    });
    if (!product || !product.active) {
      return reply.status(404).send({ message: "Product not found" });
    }
    return reply.send(product);
  });

  // POST /products — admin only
  app.post(
    "/products",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      const data = createProductSchema.parse(request.body);
      const product = await app.prisma.product.create({ data });
      return reply.status(201).send(product);
    }
  );

  // PUT /products/:id — admin only
  app.put<{ Params: { id: string } }>(
    "/products/:id",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      const data = updateProductSchema.parse(request.body);
      try {
        const product = await app.prisma.product.update({
          where: { id: request.params.id },
          data,
        });
        return reply.send(product);
      } catch {
        return reply.status(404).send({ message: "Product not found" });
      }
    }
  );

  // DELETE /products/:id — admin only (soft delete)
  app.delete<{ Params: { id: string } }>(
    "/products/:id",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      try {
        await app.prisma.product.update({
          where: { id: request.params.id },
          data: { active: false },
        });
        return reply.send({ message: "Product deleted" });
      } catch {
        return reply.status(404).send({ message: "Product not found" });
      }
    }
  );
}
