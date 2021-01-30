const Express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true}));
const server = http.createServer(app);
const socket = new WebSocket.Server({
    server: server
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/static/chat.html");
});

app.get("/:filename", (req, res) => {
    let filename = req.params.filename;
    let ext = filename.split(".")[1];
    if (ext !== "js" && ext !== "css" && ext != "jpg") {
        res.sendStatus(400);
        return;
    }
    res.sendFile(__dirname + `/static/${filename}`);
});

socket.on("connection", (ws) => {
    console.log("Web Socket Connected");
    ws.on("message", (data) => {
        socket.clients.forEach((client) => {
            client.send(data);
        });
    });
    ws.on("close", () => {
        console.log(`"${ws.username}" is disconnected.`);
    });
});

app.listen(3000, () => console.log("Started server at localhost:3000"));
server.listen(3001, () => console.log("Web Socket started:3001"));
