FROM node:24-alpine
ENV NODE_ENV=production
ENV HOST=0.0.0.0
WORKDIR /app
COPY --chown=node:node website/server.mjs website/production.mjs ./
COPY --chown=node:node website/public ./public
COPY --chown=node:node website/licenses ./licenses
USER node
EXPOSE 8080
CMD ["node", "production.mjs"]

