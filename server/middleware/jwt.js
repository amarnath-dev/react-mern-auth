const jwt = require("jsonwebtoken")

//jwt token creation
const maxAge = 3 * 24 * 60 * 60;
const createToken = (user) => {
    const accessToken = jwt.sign({ email: user.email, id: user.id }, "jwtsecrete", {
        expiresIn: maxAge
    });
    return accessToken
}

// check user is loggined in or not
const checkUserAuth = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (token) {
        jwt.verify(token, "jwtsecrete", (error, decodedToken) => {
            if (error) {
                console.log("Verification error")
                return false;
            } else {
                console.log("verification Successfull")
                next();
            }
        });
    } else {
        console.log("Verification error")
        return false;
    }
};

const checkAdminAuth = (req, res, next) => {
    const token = req.cookies.accessTokenAdmin;
    console.log("admin token", token)

    if (token) {
        jwt.verify(token, "jwtsecrete", (error, decodedToken) => {
            if (error) {
                console.log("Verification error")
                return false;
            } else {
                console.log("verification Successfull")
                next();
            }
        });
    } else {
        console.log("Verification error")
        return false;
    }
};

module.exports = { createToken, checkUserAuth, checkAdminAuth }