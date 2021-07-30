const Router = require("express").Router();
const Path = require("path");
const { readFile, readdirSync } = require("fs");
const Util = require("util");
const ReadFileAsycn = Util.promisify(readFile);

class BannerGeneratorController {
  constructor() {
    this.MapMappeds = Path.join(__dirname, "..", "public", "maps");
  }

  Mount() {
    Router.get("/", (request, response) => {
      response.render("banner-generator");
    });

    Router.get("/options", async (req, res) => {
      let directorys = readdirSync(this.MapMappeds, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      let result = [];

      for (var element of directorys) {
        let data = JSON.parse(
          await ReadFileAsycn(Path.join(this.MapMappeds, element, "map.json"))
        );

        result.push({
          value: element,
          title: data["title"],
        });
      }

      res.json(result);
    });

    Router.get("/map/:mapName", async (req, res) => {
      let dir = req.params.mapName;
      let data = JSON.parse(
        await ReadFileAsycn(Path.join(this.MapMappeds, dir, "map.json"))
      );

      data["file"] = "/public/maps/" + dir + "/background.png";
      console.log(data);
      res.json(data);
    });

    return Router;
  }
}

module.exports = BannerGeneratorController;
