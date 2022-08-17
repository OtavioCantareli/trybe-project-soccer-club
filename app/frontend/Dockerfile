FROM node:16.14-alpine
EXPOSE 3000
WORKDIR /app-frontend
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]