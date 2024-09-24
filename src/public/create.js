import {html, render} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"

var socket = io()

function form(e) {
    e.preventDefault()

    // create random number, then send to 
    // server via websocket connection
    let serverID = Math.floor(Math.random() * 10000)

    socket.emit("server", serverID)

    htmx.ajax("GET", "/select", {target: "body", swap: "innerHTML"})
}

// component that renders a form to create a server
// very much must be built upon
function createServer() {
    const template = () => html`
        <form @submit=${form}>
            <button type="submit">Create Server</button>
        </form>
    `
    const container = document.getElementById("create")
    htmx.process(container)
    render(template(), container)
}

// after website has been completely loaded, render the button to create servers
htmx.on("htmx:afterSettle", function(e) {
    createServer()
})
