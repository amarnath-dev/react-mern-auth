const User = require('../Models/userModel')
const CryptoJS = require("crypto-js")
const { createToken } = require("../middleware/jwt")
const { checkUserAuth } = require('../middleware/jwt');

module.exports.register_user = async (req, res) => {

    console.log("reached at register new user")

    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            password: CryptoJS.AES.encrypt(req.body.password, 'mysecreatekey').toString(),
        })
        let user = await newUser.save();
        if (user) {
            return res.status(200).json({ status: "success" })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports.login_user = async (req, res) => {
    const { email, password } = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            let userdbPass = userExists.password;
            const bytes = CryptoJS.AES.decrypt(userdbPass, 'mysecreatekey');
            const originalText = bytes.toString(CryptoJS.enc.Utf8);

            if (originalText === password) {
                const token = createToken(userExists);
                console.log("token is created", token)
                return res.status(200).json({ status: "success", user: userExists, token: token });
            } else {
                return res.status(401).json({ error: "Un-authorized Access" })
            }
        } else {
            return res.status(401).json({ error: "Un-authorized Access" })
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports.update_profile = async (req, res) => {

    try {
        if (!req.file) {
            console.log("No req file available")
        }
        const userId = req.params.userId;
        const user = await User.findById(userId)
        user.profileImg = {
            filename: req.file.filename
        }
        await user.save()
        const updatedUser = await User.findById(userId);
        return res.status(200).json({ status: "success", user: updatedUser })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Eroor" });
    }
}

module.exports.user_auth_check = async (req, res) => {
    try {
        const result = await checkUserAuth(req, res);
        if (!result) {
            console.log("User is not Authenticated")
        }
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};