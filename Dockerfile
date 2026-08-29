FROM node:20-slim
WORKDIR /app
COPY BankingApp/package*.json ./
RUN npm ci --only=production
COPY BankingApp/dist ./dist
COPY BankingApp/server ./server
EXPOSE 8787
CMD ["node", "server/index.mjs"]
