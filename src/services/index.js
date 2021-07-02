// const DatabaseProvider = require("./database");

class Services {
  constructor(provider) {
    if (!provider)
      throw new Error("Argument provider is missing on Service constructor.");

    this.Provider = provider();
    this.Mount();
  }

  Mount() {
    this.Provider.get("/_health", (req, res) => {
      res.json({ online: true, time: new Date() });
    });

    // this.Provider.get("/test", (req, res) => {
    //   var sql = "select * from user";
    //   var params = [];
    //   DatabaseProvider.all(sql, params, (err, rows) => {
    //     if (err) {
    //       res.status(400).json({ error: err.message });
    //       return;
    //     }
    //     res.json({
    //       message: "success",
    //       data: rows,
    //     });
    //   });
    // });

    this.Provider.on("mount", function (parent) {
      console.log("Api Service Mounted");
    });

    return this;
  }
}

module.exports = (Express) => new Services(Express);
