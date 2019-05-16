# server build
FROM gcr.io/cyberse/urlinsane as server-build

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
COPY --from=server-build /go/src/github.com/rangertaha/urlinsane/cmd/urlinsane ./urlinsane
COPY --from=ui-build /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker/run.sh ./run.sh
EXPOSE 8080
CMD ["./run.sh"]

# ui tests build
FROM ui-base as ui-test-build
ENV NODE_ENV=test
RUN npm ci
