const userNameInput = document.getElementById('UserUsername');
const passwordInput = document.getElementById('UserPassword');


function login(req, res, userName, password){
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
            //res.send("HELLO GENUINE USER")

        } else {
            //Wrong info, user asked to authenticate again
            res.setHeader("WWW-Authenticate", "Basic")
            res.sendStatus(401)
        }
    }
    //return res;
}



