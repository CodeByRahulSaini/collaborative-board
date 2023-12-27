const Client = require("socket.io-client");
let clientSocket, clientSocket2;
const port = 5001;
const room = "testRoom";

describe("socket.io server", () => {
  beforeEach((done) => {
    require("./index");
    clientSocket = new Client(`http://localhost:${port}`);
    clientSocket2 = new Client(`http://localhost:${port}`);
    clientSocket.on("connect", () => {
      const room = "testRoom";
      clientSocket.emit("joinRoom", room);
      clientSocket2.emit("joinRoom", room);
      done();
    });
  });

  afterEach(() => {
    clientSocket.close();
  });

  test("should clients receive undo event in same rooms", (done) => {
    clientSocket.emit("undo", room);
    clientSocket2.on("undo", done);
  });

  test("should clients receive redo event in same rooms", (done) => {
    clientSocket.emit("redo", room);
    clientSocket2.on("redo", done);
  });

  test("should clients receive canvasImage event in same rooms", (done) => {
    const canvasImageData = 123;
    clientSocket2.on("canvasImage", (data) => {
      if (canvasImageData === data) done();
    });
    clientSocket.emit("canvasImage", canvasImageData, room);
  });
});
