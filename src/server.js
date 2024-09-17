const express = require("express")
const path = require("path")
const app = express()
const server = require("http").createServer(app)
const WebSocket = require("ws")

const wss = new WebSocket.Server({server: server})

app.use(express.static("public"))
app.use(express.static("private"))

// directories ------------------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"))
})

app.get("/create", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/create.html"))
})

app.get("/select", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/select.html"))
})
// directories end --------------------

// websocket directories/functions
wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(message) {
        console.log("got message i think: " + message)
    })

    ws.on("close", function() {
        console.log("see you later cowboy")
        // ws.send()
    })
})
// websocket directories/functions end

server.listen(3000, () => {
    console.log("server is running")
})