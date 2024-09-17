import {html, render} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"

// testing with websockets -----------
var socket = io()
// testing with websockets end ------

function selectServer(s) {
    const template = () => html`
        <ul>
            ${s.map((server) => html`<li>${server}</li>`)}
        </ul>
    `
    const container = document.getElementById("select")
    render(template(), container)
}

socket.emit("server-grab")

socket.on("server-render", (servers) => {
    console.log(servers)

    // can turn map into for loop and then when it gets to a 
    // certain number of items, it can stop rendering and then
    // show a button to display more items to optimise speed
    selectServer(servers)
})
