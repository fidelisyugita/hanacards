# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Install openssl for Prisma
RUN apt-get update && apt-get install -y openssl

# Copy package files from the api directory (assuming context is repo root)
COPY api/package*.json ./
RUN npm install

# Copy prisma schema
COPY api/prisma ./prisma
RUN npx prisma generate

# Copy the rest of the api source code
COPY api/ .
RUN npm run build

# Runtime stage
FROM node:20-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

# Copy artifacts from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD ["npm", "run", "start"]
