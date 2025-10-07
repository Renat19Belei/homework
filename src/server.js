import express from "express";
import postRouter from "./post/post.router.js";
import userRouter from "./user/user.router.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущено http://localhost:${PORT}`);
});
