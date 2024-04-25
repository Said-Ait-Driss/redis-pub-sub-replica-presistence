const express = require("express");
const Redis = require("ioredis");

const STREAMS_KEY = "default_stream";

const redis = new Redis({
  port: 6379,
  host: "localhost",
  password: "pass",
});

const app = express();
const port = 3033;

app.post("/stream", async (req, res) => {
  console.log("streaming message");

  redis.sendCommand(
    new Redis.Command("XADD", [
      STREAMS_KEY,
      "*",
      "message_key",
      "message_value",
    ])
  );
});

// Start Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
