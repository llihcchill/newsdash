import {html, render} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js"

// testing with websockets -----------
var socket = io()
// testing with websockets end ------

function click(e) {
    e.preventDefault()

    // save these and they will act as codes to get into servers
    // though do be careful of having numbers less than total 
    // number of digits (i.e. should be >1000 but is 809)
    
    // convert it into a string and append a 0 to the start
    // depending on how different it is
    console.log(e.target)
    console.log(e.target.id)
}

function selectServer(s) {
    const template = () => html`
        <ul>
            ${s.map((server) => html`

            <li>
            ${server}
            <button id=${server} @click=${click}>Join Server</button>
            </li>

            `)}
        </ul>
    `
    const container = document.getElementById("select")
    render(template(), container)
}

// after web page is fully loaded, emit socket to grab all servers
htmx.on("htmx:afterSettle", function(e) {
    socket.emit("server-grab")
})

socket.on("server-render", (servers) => {
    console.log(servers)

    // can turn map into for loop and then when it gets to a 
    // certain number of items, it can stop rendering and then
    // show a button to display more items to optimise speed
    selectServer(servers)
})
