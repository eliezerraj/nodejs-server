# docker build -t nodejs-server-v2:latest .
# docker run --name nodejs-server -p 3000:3000 -d nodejs-server
FROM node:latest AS builder

RUN apt-get update
WORKDIR /app
COPY . .
RUN npm ci --only=production

FROM node:alpine

ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app .
EXPOSE 3000
#v1
#CMD ["npm", "start"]

#v2
CMD [ "node", "server.js" ]
