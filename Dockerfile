# server build
FROM rangertaha/urlinsane as server-build

# ui build
FROM node:lts-alpine as ui-build
WORKDIR /app
COPY ./package-lock.json ./package.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

# production build
FROM nginx:stable-alpine as serve
COPY --from=server-build /go/src/github.com/rangertaha/urlinsane/builds/urlinsane-*linux* ./urlinsane
COPY --from=ui-build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/run.sh ./run.sh
EXPOSE 80
CMD ["./run.sh"]

FROM ui-build as test

ENV NODE_ENV=dev

RUN npm ci
