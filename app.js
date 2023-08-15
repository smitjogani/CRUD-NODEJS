require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const router = require("./Routes/router");
const PORT = 5004;

app.use(cors());
app.use(express.json());
app.use(router);

// get response
// app.use("/", (req, res) => {
//   res.status(200).json("Server start");
// });

//start the server
app.listen(PORT, () => {
  console.log(`server start at ${PORT}`);
});
