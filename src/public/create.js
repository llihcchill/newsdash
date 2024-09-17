import {html, render} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"

// testing with websockets -----------
var socket = io()
// testing with websockets end ------

function form(e) {
    e.preventDefault()

    // create random number, then send to 
    // server via websocket connection
    let serverID = Math.floor(Math.random() * 10000)

    socket.emit("server", serverID)

    htmx.ajax("GET", "/select", {target: "body", swap: "innerHTML"})
}

function createServer() {
    const template = () => html`
        <form @submit=${form}>
            <button type="submit">Create Server</button>
        </form>
    `
    const container = document.getElementById("create")
    render(template(), container)
}

createServer()
