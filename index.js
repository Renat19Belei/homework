import express from "express";
import postRouter from "./src/post/post.router.js";
import userRouter from "./src/user/user.router.js";

const app = express();

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

const PORT = 8000;
const HOST = "127.0.0.1"
app.listen(PORT, () => {
  console.log(`Сервер запущенно ${PORT}`);
});
