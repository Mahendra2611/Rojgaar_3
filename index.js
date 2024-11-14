import express from "express";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import jobRouter from "./routes/job.route.js"
import companyRoute from "./routes/company.route.js"
import applicationRouter from "./routes/application.route.js"
import cookieParser from "cookie-parser";
import saveRouter from "./routes/saveLater.route.js"
import adminJobRoute from "./routes/adminJob.route.js"
import cors from "cors";
// import { verificationEmail } from "./utils/verificationEmail.js";
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
// app.get("/email",verificationEmail)
const PORT = process.env.PORT || 3000
const server = app.listen(PORT,()=>{
   connectDB();
    //yconsole.log(`Server Running on PORT ${PORT}`)
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