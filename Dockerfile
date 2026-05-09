FROM node:26-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY . .
RUN pnpm build

FROM node:26-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@11 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts --prod
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/locales ./locales

USER node

CMD ["sh", "-c", "node dist/db/migrate.js && node dist/index.js"]