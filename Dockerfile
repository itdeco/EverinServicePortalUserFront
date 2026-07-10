# ---------- deps ----------
FROM public.ecr.aws/docker/library/node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci


# ---------- builder ----------
FROM public.ecr.aws/docker/library/node:20-alpine AS builder

WORKDIR /app

ARG PROFILE=stg
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN echo "Current Profile : ${PROFILE}"

RUN if [ "$PROFILE" = "dev" ]; then \
        npm run build:dev; \
    elif [ "$PROFILE" = "stg" ]; then \
        npm run build:stg; \
    elif [ "$PROFILE" = "prod" ]; then \
        npm run build:prod; \
    else \
        npm run build:stg; \
    fi


# ---------- runner ----------
FROM public.ecr.aws/docker/library/node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache curl

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["sh", "-c", "HOSTNAME=0.0.0.0 node server.js"]
