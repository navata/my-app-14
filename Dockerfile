# ======= Base image with Node.js and Corepack =======
FROM --platform=${BUILDPLATFORM} node:18-alpine AS base
ARG BUILDPLATFORM
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN corepack enable && apk add --no-cache libc6-compat g++ make python3
WORKDIR /app

# ======= Install dependencies based on the preferred package manager =======
FROM base AS deps
RUN corepack prepare pnpm@9.5.0 --activate
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# ======= Build the application =======
FROM base AS builder
ARG ENV_DEPLOY=development
RUN corepack prepare pnpm@9.5.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN \
  if [ "$ENV_DEPLOY" != "production" ] && [ -f .env."$ENV_DEPLOY" ]; then \
    cp .env."$ENV_DEPLOY" .env.production; \
  else \
    echo "File .env.$ENV_DEPLOY does not exist or ENV_DEPLOY is production. Skipping copy."; \
  fi
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
# RUN pnpm build
RUN pnpm run build

# ======= Production image, copy all the files and run next =======
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
# RUN apk add openssl1.1-compat
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
# ENV HOSTNAME "0.0.0.0"
ENV NODE_OPTIONS="--max-old-space-size=8192"
CMD ["node", "server.js"]
