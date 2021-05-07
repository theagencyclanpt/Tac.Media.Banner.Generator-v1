const { IgApiClient } = require("instagram-private-api");
const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const port = 3001;
const { readFile } = require("fs");
const ig = new IgApiClient();
const { promisify } = require("util");
const readFileAsync = promisify(readFile);
const fs = require("fs");

app.use("/static", express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// (async () => {
//   ig.state.generateDevice(process.env.INSTA_USER);
//   await ig.account.login(rocess.env.INSTA_USER, rocess.env.camelo123);
// })();

async function publishOnInsta() {
  await ig.publish.story({
    file: await readFileAsync(path.resolve(__dirname, "temp", "1.jpeg")),
  });
}

app.post("/publish-insta", async (req, res) => {
  var imgData = req.body.image;
  var base64Data = imgData.split(",")[1];
  fs.writeFile("./temp/1.jpeg", base64Data, "base64", async function () {
    try {
      await publishOnInsta();
      fs.unlinkSync("./temp/1.jpeg");
    } catch (error) {
      console.log(error);
    }
  });

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
