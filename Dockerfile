FROM gcr.io/distroless/nodejs24-debian13@sha256:2b39d276e969e32d23e7266aeb6b493ba96f13f86860a91d6f895c4e99fee25b

WORKDIR /app

COPY next-logger.config.js /app/
COPY .next/standalone /app/
COPY public /app/public/

EXPOSE 3000

ENV NODE_ENV=production

CMD ["server.js"]
