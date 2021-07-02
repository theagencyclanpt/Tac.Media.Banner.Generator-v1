const Express = require("express");
const Services = require("./services")(Express);
const Client = require("./client")(Express);

const Startup = Express();

Startup.use(Express.json({ limit: "50mb" }));
Startup.use(Express.urlencoded({ limit: "50mb" }));

Startup.use("/api", Services.Provider);
Startup.use("/", Client.Provider);

Startup.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
