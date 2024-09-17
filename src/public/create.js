import {html, render} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"
import {servers} from "../private/_state.js"

const socket = new WebSocket("ws://localhost:3000")

// testing with websockets -----------
socket.onopen = function(event) {
    console.log("onopen")
  };
  
  socket.onmessage = function(event) {
    console.log("onmessage")
  };
  
  socket.onclose = function(event) {
    console.log("onclose")
  };
  
  function sendMessage(message) {
    socket.send(message);
  }
// testing with websockets end ------

function form(e) {
    e.preventDefault()

    // create random number, push to state, then send to 
    // server via websocket connection
    let serverID = Math.floor(Math.random() * 10000)
    servers = [].push(serverID)

    sendMessage(serverID)
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