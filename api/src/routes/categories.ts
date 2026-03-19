import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { requireAdmin, verifyToken } from "../middleware/auth.js";

const createCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export const categoriesRoutes: FastifyPluginAsync = async (fastify) => {
  // GET all categories (public)
  fastify.get("/categories", async (request, reply) => {
    try {
      const categories = await fastify.prisma.category.findMany({
        orderBy: { name: 'asc' }
      });
      return reply.send(categories);
    } catch (err) {
      request.log.error(err);
      return reply.status(500).send({ message: "Internal server error" });
    }
  });

  // POST create category (admin)
  fastify.post(
    "/categories",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      try {
        const data = createCategorySchema.parse(request.body);
        const newCategory = await fastify.prisma.category.create({
          data,
        });
        return reply.status(201).send(newCategory);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: "Validation error", errors: err.issues });
        }
        if ((err as any).code === 'P2002') {
          return reply.status(400).send({ message: "Category with this name already exists" });
        }
        request.log.error(err);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );

  // PUT update category (admin)
  fastify.put<{ Params: { id: string } }>(
    "/categories/:id",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      try {
        const { id } = request.params;
        const data = updateCategorySchema.parse(request.body);
        
        const updatedCategory = await fastify.prisma.category.update({
          where: { id },
          data,
        });
        return reply.send(updatedCategory);
      } catch (err) {
        if (err instanceof z.ZodError) {
          return reply.status(400).send({ message: "Validation error", errors: err.issues });
        }
        if ((err as any).code === 'P2025') {
          return reply.status(404).send({ message: "Category not found" });
        }
        request.log.error(err);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );

  // DELETE category (admin)
  fastify.delete<{ Params: { id: string } }>(
    "/categories/:id",
    { preHandler: [verifyToken, requireAdmin] },
    async (request, reply) => {
      try {
        const { id } = request.params;
        await fastify.prisma.category.delete({
          where: { id },
        });
        return reply.send({ success: true });
      } catch (err) {
        if ((err as any).code === 'P2025') {
          return reply.status(404).send({ message: "Category not found" });
        }
        request.log.error(err);
        return reply.status(500).send({ message: "Internal server error" });
      }
    }
  );
};
