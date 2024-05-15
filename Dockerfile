# Set base container
FROM node:18.17.0-alpine as base

RUN apk add --no-cache libtool automake autoconf nasm build-base curl jq

# Dependencies stage
FROM base AS deps

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./


RUN yarn install

# Build stage
FROM base AS builder

# Accept NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as a build argument
ARG NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
ARG NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID
ARG NEXT_PUBLIC_TENANT_ID
ARG TENANT_API_TOKEN
ARG NEXT_PUBLIC_TENANT_LOCALE
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_TENANT_AID
ARG NEXT_PUBLIC_DEFAULT_CURRENCY
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_HOTJAR_ID
ARG NEXT_PUBLIC_LOCATIONS_PATH
ARG NEXT_PUBLIC_SITE_URL

# Set the environment variable so it's available during the build
ENV NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
ENV NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=${NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
ENV NEXT_PUBLIC_TENANT_ID=${NEXT_PUBLIC_TENANT_ID}
ENV TENANT_API_TOKEN=${TENANT_API_TOKEN}
ENV NEXT_PUBLIC_TENANT_LOCALE=${NEXT_PUBLIC_TENANT_LOCALE}
ENV NEXT_PUBLIC_TENANT_AID=${NEXT_PUBLIC_TENANT_AID}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_PUBLIC_DEFAULT_CURRENCY=${NEXT_PUBLIC_DEFAULT_CURRENCY}
ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_HOTJAR_ID=${NEXT_PUBLIC_HOTJAR_ID}
ENV NEXT_PUBLIC_LOCATIONS_PATH=${NEXT_PUBLIC_LOCATIONS_PATH}
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

WORKDIR /app
COPY . .

COPY ./website-settings.sh website-settings.sh
COPY ./tenant-settings.sh tenant-settings.sh
COPY ./favicon.sh favicon.sh
COPY ./settings ./settings
RUN chmod +x ./tenant-settings.sh ./website-settings.sh ./favicon.sh
RUN /bin/sh ./tenant-settings.sh
RUN /bin/sh ./website-settings.sh
RUN /bin/sh ./favicon.sh
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build


# Run stage
FROM base AS runner

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/tailwind.config.ts ./tailwind.config.ts
COPY --from=builder /app/postcss.config.js ./postcss.config.js
COPY --from=builder /app/settings ./settings

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000
CMD yarn start