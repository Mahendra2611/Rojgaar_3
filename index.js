import express from "express";
//import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import jobRouter from "./routes/job.route.js"
import companyRoute from "./routes/company.route.js"
import applicationRouter from "./routes/application.route.js"
import cookieParser from "cookie-parser";
import saveRouter from "./routes/saveLater.route.js"
import adminJobRoute from "./routes/adminJob.route.js"
import forgotPwd from "./routes/forgotPwd.route.js"
import cors from "cors";
import mongoose from "mongoose";
// import { verificationEmail } from "./utils/verificationEmail.js";
// origin: "https://rojgaar-mpv.onrender.com",
// origin: "http://localhost:5173",
dotenv.config()
const corsOptions = {
  origin: "http://localhost:5173",
    methods: ["POST", "GET","DELETE","PUT"],
    credentials: true
  };
const app = express();
app.use(cookieParser());
app.use(cors(corsOptions))
app.use(express.json({ limit: '10mb' }));

app.use("/user",userRoute)
app.use("/company",companyRoute)
app.use("/job",jobRouter)
app.use("/application",applicationRouter)
app.use("/savelater",saveRouter)
app.use("/adminJob",adminJobRoute)
app.use("/forgotPwd",forgotPwd)
// app.get("/email",verificationEmail)
let dbConnected = false;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
           
        });
        dbConnected = true;
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

connectDB();

app.get("https://rojgaar-mpv.onrender.com/*", (req, res, next) => {
    if (!dbConnected) {
        return res.status(503).send("<h1>Website is starting up. Please wait...</h1>");
    }
    next();
});

const PORT = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
  
    console.log(`Server Running on PORT ${PORT}`)
})
process.on('uncaughtException', (error) => {
  //console.error('Uncaught Exception:', error);

  server.close(() => {
      //console.log('Server shutting down due to uncaught exception');
      process.exit(1); 
  });
  setTimeout(() => {
      //console.error('Force shutdown after uncaught exception');
      process.exit(1);
  }, 5000);
});
process.on('unhandledRejection',(error)=>{
  //console.log('unhandledRejection : ',error)
  server.close(()=>{
    process.exit(1)
  })
})