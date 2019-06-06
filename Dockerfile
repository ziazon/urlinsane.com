# ui base
FROM node:lts-alpine as ui-base

ARG WEBSOCKET_PROTOCOL=ws
ARG WEBSOCKET_HOST=http://api.urlinsane.com
ARG WEBSOCKET_PORT=80

WORKDIR /app
COPY ./package-lock.json ./package.json ./
RUN npm ci
COPY . .


# ui build
FROM ui-base as ui-build

ENV VUE_APP_WEBSOCKET_PROTOCOL=${WEBSOCKET_PROTOCOL}
ENV VUE_APP_WEBSOCKET_HOST=${WEBSOCKET_HOST}
ENV VUE_APP_WEBSOCKET_PORT=${WEBSOCKET_PORT}
ENV NODE_ENV=production

RUN npm run build


# server build
FROM nginx:stable-alpine as serve

COPY --from=ui-build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
