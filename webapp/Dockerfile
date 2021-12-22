FROM node:alpine
RUN mkdir -p /usr/src/www
WORKDIR /usr/src/www
COPY . .
RUN npm install --production-only
CMD ["node", "webpage.js"]