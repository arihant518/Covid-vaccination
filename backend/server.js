const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routers/userRoute")
const adminRoute = require("./routers/adminRoute")
const DB = require("./DB/db")


const app = express()
app.use(express.json())
app.use(cors())

app.use("/user",userRoute)
app.use("/admin",adminRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})