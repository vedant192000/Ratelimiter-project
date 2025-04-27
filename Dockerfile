# Use Node.js image
FROM node:16-alpine

WORKDIR /app

COPY . /app
RUN npm install
RUN npm run build

ENV USE_KUBE=YES
ENV REDIS_URL=redis:6379

# Expose the application port
EXPOSE 3009

# Start the app
CMD ["node","dist/server.js"]
