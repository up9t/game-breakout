FROM oven/bun:1-alpine AS base-builder
FROM nginx:1.29-alpine AS base-runner

FROM base-builder AS builder

WORKDIR /app

COPY package.json bun.lock .

RUN bun i

COPY . .

RUN bun run build

FROM base-runner AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80