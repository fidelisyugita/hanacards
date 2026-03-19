import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import prismaPlugin from "./plugins/prisma.js";
import firebasePlugin from "./plugins/firebase.js";
import { productRoutes } from "./routes/products.js";
import { orderRoutes } from "./routes/orders.js";
import { authRoutes } from "./routes/auth.js";
import { adminRoutes } from "./routes/admin.js";
import { categoriesRoutes } from "./routes/categories.js";

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === "development" ? "info" : "warn",
  },
});

async function build() {
  // Plugins
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });

  await app.register(sensible);
  await app.register(prismaPlugin);
  await app.register(firebasePlugin);

  // Health check
  app.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  // Routes
  await app.register(productRoutes);
  await app.register(orderRoutes);
  await app.register(authRoutes);
  await app.register(adminRoutes);
  await app.register(categoriesRoutes);

  return app;
}

const start = async () => {
  try {
    const server = await build();
    const port = parseInt(process.env.PORT ?? "3001", 10);
    await server.listen({ port, host: "0.0.0.0" });
    console.log(`🚀 Server running at http://localhost:${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
