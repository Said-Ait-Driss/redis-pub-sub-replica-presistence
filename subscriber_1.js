const redis = require("redis");

const channel = "default";

const sub = redis.createClient({
  password: "pass",
  host: "localhost",
  port: 6380,
});

async function main() {
  await sub.connect();

  sub.subscribe(channel, (message) => {
    console.log("subscriber 1 received message : ", message);
  });
}

main();
