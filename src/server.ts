import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import authenticate from "./middlewares/authenticate";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.use((socket, next) => {
  // authenticate(socket.request, socket.request.res, next);

  next()
});

io.on("connection", (socket: Socket) => {
  // console.log("++++++++++++++++++++++++++++++++++", socket.request.headers);
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
