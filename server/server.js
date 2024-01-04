const express = require("express")
const mongoose = require("mongoose")
const userRoute = require("./Routes/user")
const adminRoute = require("./Routes/admin")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require('path')

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect("mongodb+srv://amarnath:ahPYSbzbNvJPykxr@mycluster.7lmcerc.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("DB Connected")
}).catch((err) => {
    console.log(err)
})

app.use("/", userRoute);
app.use("/admin", adminRoute);


app.listen(port, () => {
    console.log(`Server Started Successfully ${port}`)
})