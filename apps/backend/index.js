const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173/",
});

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

const PORT = 5001;
io.listen(PORT);

module.exports = io;
console.log(`Listening on port ${PORT}`);
