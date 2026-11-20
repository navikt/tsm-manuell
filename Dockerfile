FROM gcr.io/distroless/nodejs24-debian13@sha256:3cd3edf42ec9122fde1be4cd6de2bf63a4ffc4df3353492e216ed3e1c5f906c8

WORKDIR /app

COPY next-logger.config.js /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
