const Path = require("path");
const BannerGeneratorController = require("./controllers/BannerGeneratorController");
const DashboardController = require("./controllers/DashboardController");

class Client {
  constructor(provider) {
    if (!provider)
      throw new Error("Argument provider is missing on Client constructor.");

    this.Provider = provider();
    this.PublicDir = provider.static(Path.join(__dirname, "public"));
    this.ViewPath = Path.join(__dirname, "views");
    this.BannerGeneratorController = new BannerGeneratorController();
    this.DashboardController = new DashboardController();
    this.Mount();
  }

  Mount() {
    this.Configuration();

    this.Provider.get("/_health", (req, res) => {
      res.json({ online: true, time: new Date() });
    });

    this.Provider.use("/public", this.PublicDir);

    this.Provider.use("/", this.BannerGeneratorController.Mount());
    this.Provider.use("/dashboard", this.DashboardController.Mount());

    this.Provider.on("mount", function (parent) {
      console.log("Client Mounted");
    });

    return this;
  }

  Configuration() {
    this.Provider.set("view engine", "ejs");
    this.Provider.set("views", this.ViewPath);
  }
}

module.exports = (Express) => new Client(Express);
