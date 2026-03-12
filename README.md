# Hana Cards

Multirepo layout — frontend and API are separate packages within this repository.

## Structure

```
hanacards/
├── frontend/   React + Vite SPA (deployed on Firebase Hosting)
└── api/        Node.js + Fastify + Prisma REST API
```

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### API
```bash
cd api
cp .env.example .env  # fill in DB and Firebase credentials
npm install
npm run db:migrate
npm run dev
```
