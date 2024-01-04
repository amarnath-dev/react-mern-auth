const Admin = require("../Models/adminModel");
const User = require("../Models/userModel");
const { createToken } = require("../middleware/jwt");
const { checkAdminAuth } = require("../middleware/jwt");

module.exports.admin_signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newAdmin = Admin({
            email: email,
            password: password
        })
        let save = await newAdmin.save();
        if (save) {
            return res.status(200).json({ status: "success" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports.admin_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await Admin.findOne({ email });
        if (checkUser) {
            let dbPassword = checkUser.password;
            if (dbPassword === password) {
                let token = createToken(checkUser)
                // const maximumAge = (3 * 24 * 60 * 60) * 1000;
                // res.cookie("adminAcessToken", token, { maxAge: maximumAge })
                return res.status(200).json({ status: "sucess", token: token });
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

module.exports.admin_home = checkAdminAuth, async (req, res) => {
    try {
        let allUsers = await User.find();
        return res.status(200).json({ status: "success", allUsers });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports.admin_edit = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        return res.status(200).json({ status: "success", user })
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports.admin_edit_put = async (req, res) => {
    console.log("reched at admin edit")
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId)

        console.log(req.body.userName)
        console.log(req.body.userPhone)

        const userUpdate = await User.findByIdAndUpdate(userId, {
            $set: {
                name: req.body.userName ? req.body.userName : user.name,
                phone: req.body.userPhone ? req.body.userPhone : user.phone,
            }
        }, { new: true })

        console.log("Updated User", userUpdate)
        return res.status(200).json({ status: "success", user: userUpdate })

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports.admin_delete_user = async (req, res) => {
    try {
        const userId = req.params.userId;
        const remove = await User.findByIdAndDelete(userId)
        if (remove) {
            const allUsers = await User.find()
            return res.status(200).json({ status: "success", allUsers });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" })
    }
}

module.exports.admin_search = async (req, res) => {
    try {
        const { q } = req.query;

        //Search function
        const search = (data) => {
            return data.filter((item) => item.name.toLowerCase().includes(q));
        }
        const allUsers = await User.find();
        return res.send(search(allUsers));
    } catch (error) {
        return res.status(500).json({ error: "internal server error" })
    }
}

module.exports.admin_auth_check = async (req, res) => {
    try {
        const result = await checkAdminAuth(req, res);
        if (!result) {
            console.log("Admin is not Authenticated")
        }
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}