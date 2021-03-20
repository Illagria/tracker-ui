FROM node AS builder

USER root

WORKDIR /app

COPY . .

RUN yarn install --frozen--lockfile

RUN yarn build

# Stage 2
FROM nginx

COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]
