import express from "express";
import bodyParser from "body-parser";

import usersRoutes from "./Routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  console.log("[TEST]!");
  res.send("hello world");
});
app.listen(PORT, () =>
  console.log("Guess Who's Back? Back Again, server's back, tell IPFS ")
);
