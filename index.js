require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
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
app.use(cookieParser('1234'));

/*app.use(session({
  store: new File_Store,
  secret: 'hello world',
  resave: true,
  saveUninitialized: true
}))

app.use('/', (req,res,next)=> {
  if (!req.session.user) {
    console.log("Session not set-up yet")
    if (!req.headers.authorization) {
      console.log("No auth headers")
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    } else {
      let auth_stuff = new Buffer.from(req.headers.authorization.split(" ")[1], 'base64')
      let step1 = auth_stuff.toString().split(":")
      console.log("Step1: ", step1)
      if (step1[0] == 'admin' && step1[1] == 'admin') {
        console.log('GENUINE USER')
        req.session.user = 'admin'
        res.send("GENUINE USER")
      } else {
        res.setHeader("WWW-Authenticate", "Basic")
        res.sendStatus(401)
      }
    }
  }
});*/


app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login", "login.html"));
});

app.post('/api/auth', (req, res) => {
  let cookie_Stuff=req.signedCookies.user  //But the user is logging in for the first time so there won't be any appropriate signed cookie for usage.
  if(!cookie_Stuff) {
    let auth_Stuff=req.headers.authorization
    if(!auth_Stuff)//No authentication info given
    {
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    } else {
      step1 = new Buffer.from(auth_Stuff.split(" ")[1], 'base64')
      //Extracting username:password from the encoding Authorization: Basic username:password
      step2 = step1.toString().split(":")
      //Extracting the username and password in an array
      if(step2[0]=='admin' && step2[1]=='admin') {
        //Correct username and password given
        console.log("WELCOME ADMIN")
        //Store a cookie with name=user and value=username
        res.cookie('user', 'admin', {signed: true})
        res.send("Signed in the first time")
      } else {
        //Wrong authentication info, retry
        res.setHeader("WWW-Authenticate", "Basic")
        res.sendStatus(401)
      }
    }
  } else {//Signed cookie already stored
    if(req.signedCookies.user=='admin') {
      res.send("HELLO GENUINE USER")

    } else {
      //Wrong info, user asked to authenticate again
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    }
  }
})

/*app.use('/login', (req,res) =>{
  let cookie_Stuff=req.signedCookies.user  //But the user is logging in for the first time so there won't be any appropriate signed cookie for usage.
  if(!cookie_Stuff) {
    let auth_Stuff=req.headers.authorization
    if(!auth_Stuff)//No authentication info given
    {
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    } else {
      step1 = new Buffer.from(auth_Stuff.split(" ")[1], 'base64')
      //Extracting username:password from the encoding Authorization: Basic username:password
      step2 = step1.toString().split(":")
      //Extracting the username and password in an array
      if(step2[0]==userName && step2[1]==password) {
        //Correct username and password given
        console.log("WELCOME ADMIN")
        //Store a cookie with name=user and value=username
        res.cookie('user', 'admin', {signed: true})
        res.send("Signed in the first time")
      } else {
        //Wrong authentication info, retry
        res.setHeader("WWW-Authenticate", "Basic")
        res.sendStatus(401)
      }
    }
  } else {//Signed cookie already stored
    if(req.signedCookies.user==userName) {
      res.send("HELLO GENUINE USER")

    } else {
      //Wrong info, user asked to authenticate again
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    }
  }
  if (res !== 401) {
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    })
  }
})*/

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
