const express = require("express")
const path = require("path")
const app = express()
const server = require("http").createServer(app)

const { Server } = require("socket.io")
const io = new Server(server)

// global variables ---------
var servers = []
// global variables end -----

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
io.on("connection", (socket) => {
    console.log("user connected")

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })

    socket.on("server", (server) => {
        console.log(server)

        // save to db, but in this case save to variable
        servers.push(server)
        console.log(servers)
    })

    socket.on("server-grab", () => {
        console.log("server grab has initiated")
        io.emit("server-render", servers)
    })
})
// websocket directories/functions end

server.listen(3000, () => {
    console.log("server is running")
})
