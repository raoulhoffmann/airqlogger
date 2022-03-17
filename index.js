const mqtt = require("mqtt");
const fs = require("fs");


if(!fs.existsSync("./data.csv")){
  fs.writeFileSync("./data.csv", "timestamp,temperature,humidity,co2\n");
}

const client  = mqtt.connect("http://192.168.178.44")

client.on("connect", function () {
  client.subscribe("broker/counter");
});

client.on("message", function (topic, message) {
  console.log(message.toString());
  fs.appendFileSync("./data.csv", Date.now() + "," + message.toString() + "\n");
});
