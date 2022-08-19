import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from 'dotenv'

//initialize this app
const app = express();

dotenv.config()
//use all different methods on app instance
//general setup
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


app.use("/posts", postRoutes); //added prefix of posts infront of all routes
//connect our server application with database

app.get('/',(req,res)=>{
  res.send('Hello to memmories api')
})
// const CONNECTION_URL =
//   "mongodb+srv://priyaanurag:emTemcdjw9Iq6Aqa@cluster0.iivitey.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
