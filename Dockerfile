# ui base
FROM node:lts-alpine as ui-base
WORKDIR /app
COPY ./package-lock.json ./package.json ./
RUN npm ci
COPY . .

# ui tests build
FROM ui-base as ui-build
ENV NODE_ENV=production
RUN npm run build

# server build
FROM nginx:stable-alpine as serve
COPY --from=ui-build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
