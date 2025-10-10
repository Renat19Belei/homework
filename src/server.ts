import express, { Express } from "express";
import postRouter from "./post/post.router";
import userRouter from "./user/user.router";

const app: Express = express();

app.use(express.json());

app.use("/posts", postRouter);
app.use("/users", userRouter);

const HOST = "127.0.0.1"
const PORT = 8000;

app.listen(PORT, HOST, () => {
  console.log(`Сервер запущено http://${HOST}:${PORT}`);
});
