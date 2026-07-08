FROM gcr.io/distroless/nodejs24-debian13@sha256:7dddf4fb0e101fd065eb20a2befd1c467cf1cabaeaca3df85aa4431150f51dc9

WORKDIR /app

COPY next-logger.config.js /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
