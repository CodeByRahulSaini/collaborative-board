const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
  transports: ["websocket", "polling"],
  secure: process.env.NODE_ENV === "production",
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const PORT = process.env.PORT || 5001;

// Event handler for when a client connects to the server
io.on("connection", function (socket) {
  // Event handler for when a client joins a room
  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  // Event handler for when a client sends a canvas image to be broadcasted to other clients in the same room
  socket.on("canvasImage", (data, room) => {
    socket.to(room).emit("canvasImage", data);
  });

  // Event handler for when a client requests an undo action to be performed by other clients in the same room
  socket.on("undo", (room) => {
    socket.to(room).emit("undo");
  });

  // Event handler for when a client requests a redo action to be performed by other clients in the same room
  socket.on("redo", (room) => {
    socket.to(room).emit("redo");
  });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
