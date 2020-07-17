import express from "express";

const router = express.Router();

const users = [
  {
    id: "1",
    name: "Joe McKay",
  },
];

router.get("/", (req, res) => {
  console.log(users);
  res.send("hello");
});

export default router;
