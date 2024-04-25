const Redis = require("ioredis");

const async = require("async");
const STREAMS_KEY = "default_stream";

const redis = new Redis({
  port: 6380,
  host: "localhost",
});

const processMessage = (message) => {
  console.log("Id: %s. Data: %O", message[0], message[1]);
};

async function main() {
  async.forever(
    async function (next) {
      const results = await redis.xread(
        "block",
        0,
        "STREAMS",
        STREAMS_KEY,
        "$"
      ); // $ means last id
      const [key, messages] = results[0];
      messages.forEach(processMessage);
    },
    function (err) {
      console.log(" ERROR " + err);
      process.exit();
    }
  );
}

main();
