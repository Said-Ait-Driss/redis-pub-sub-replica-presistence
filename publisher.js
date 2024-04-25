const express = require("express");
const redis = require("redis");

const app = express();

app.use(express.json());

const port = 3030;
const channel = "default";

let pub;
(async () => {
  pub = redis.createClient({
    password: "pass",
    host: "localhost",
    port: 6379,
  });

  await pub.connect();
})();

app.post("/publish", async (req, res) => {
  const body = req.body;
  console.log(body);
  await pub.publish(channel, JSON.stringify(body), (err, reply) => {
    if (err) {
      console.error("Error occurred while publishing message:", err);
    } else {
      console.log("Message published successfully:", reply);
    }
  });

  res.send("message published ");
});



// Start Express server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
