require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const { readFile, readdirSync } = require("fs");
const util = require("util");
const readFileAsycn = util.promisify(readFile);

const mapsDirectory = path.join(__dirname, "maps");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

app.use("/static", express.static("public"));
app.use("/maps", express.static("maps"));
app.use("/scripts", express.static("node_modules"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/calendar", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "calendar", "index.html"));
});

app.get("/map/:mapName", async (req, res) => {
  let dir = req.params.mapName;
  let data = JSON.parse(
    await readFileAsycn(path.join(mapsDirectory, dir, "map.json"))
  );

  data["file"] = "./maps/" + dir + "/background.png";
  console.log(data);
  res.json(data);
});

app.get("/options", async (req, res) => {
  let directorys = getDirectories(mapsDirectory);

  let result = [];

  for (var element of directorys) {
    let data = JSON.parse(
      await readFileAsycn(path.join(mapsDirectory, element, "map.json"))
    );

    result.push({
      value: element,
      title: data["title"],
    });
  }

  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
