FROM hayd/alpine-deno:1.0.0

EXPOSE 8000

WORKDIR /app

USER deno

COPY . .

CMD ["run", "--allow-net", "--allow-read", "--allow-write", "--allow-plugin", "--unstable", "app.ts"]