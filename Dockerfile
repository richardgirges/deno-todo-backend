FROM hayd/deno:alpine-1.0.0

ENV PORT=3000

RUN mkdir -p /opt/todo
WORKDIR /opt/todo
ADD . .
RUN deno cache src/server.ts

EXPOSE $PORT

CMD ["run", "--allow-net", "--allow-env", "src/server.ts"]