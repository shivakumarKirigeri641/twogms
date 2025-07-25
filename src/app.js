const cookieParser = require("cookie-parser");
const connectDB = require("./database/connectDB");
const express = require("express");
const app = new express();
const registrationRouter = require("./routers/registrationRouter");
const authRouter = require("./routers/authRouter");
const serviceRouter = require("./routers/serviceRouter");
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:1234",
    credentials: true,
  })
);
app.use("/", registrationRouter);
app.use("/", authRouter);
app.use("/", serviceRouter);
connectDB()
  .then(() => {
    console.log("gms Database connected successfully....");
    app.listen(8888, () => {
      console.log("Server is listening now...");
    });
  })
  .catch((err) => {
    console.log("Failed in server!");
  });
