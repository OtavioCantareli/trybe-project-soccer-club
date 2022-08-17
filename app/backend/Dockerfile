FROM node:16.14-alpine
EXPOSE 3001
WORKDIR /app-backend
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]