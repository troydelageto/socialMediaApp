const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const helmet=require("helmet")
const morgan=require("morgan")
const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")

const app=express()


// Dot env folder
dotenv.config()


// mongoose Db connection
mongoose.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex:true
    
},()=>{console.log("Connection with MongoDb-Atlas Established")});

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);




// server listening
app.listen(process.env.port||8800,()=>{
    console.log("SocialApp API running correctly");
})