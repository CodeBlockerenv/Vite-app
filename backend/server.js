import express, { json } from "express";
import cookieParser  from 'cookie-parser';
import dotenv from "dotenv";
import cors from 'cors';
import  {app,server} from './socket/socket.js';
import { dirname, join } from 'path'; 
import { fileURLToPath } from 'url';
import path from 'path';



//importing routes
import authRoutes from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import { ConnectTODB } from "./DB/ConnectToDB.js";
// const __dirname = path.resolve(dirname(fileURLToPath(import.meta.url)), '..');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const corsOptions = {
//     //To allow requests from client
//     origin: [
//       "http://localhost:3000/"
//     ],
//     credentials: true,
//     exposedHeaders: ["set-cookie"],
//   };
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname,".","dist")));
dotenv.config();
// app.use(cors({ origin: 'http://localhost:3000',credentials: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Content-Type,Authorization',
  }));
  
app.use(express.json());
app.use(cookieParser());
const PORT=process.env.PORT || 8000;
console.log(PORT);


// API's

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoute);
app.use("/api/users",userRoute);

app.use((req, res)=>{
  res.sendFile(path.join(__dirname,".","dist","index.html"))
  })


server.listen(PORT,()=>{
    ConnectTODB();
    console.log("server is running at port "+PORT);
})