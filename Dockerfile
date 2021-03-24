FROM node AS builder

USER root

WORKDIR /app

COPY . .

RUN yarn install --frozen--lockfile

RUN yarn build

# Stage 2
FROM nginx

COPY --from=builder /app/build/ /usr/share/nginx/html
COPY --from=builder /app/configs/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/scripts/ /app/scripts/

EXPOSE 80

CMD [ "sh", "/app/scripts/docker_run.sh" ]
