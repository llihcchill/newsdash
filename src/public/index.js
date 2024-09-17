import {html, render} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js"

function form(e) {
    e.preventDefault()

    // turn form into an object with FormData, then gather entries from the object
    const form = e.target;
    const formData = new FormData(form);
    const formValues = Object.fromEntries(formData.entries());

    let username = formValues.username;
    console.log(username)

    // when going into production, put it into a db instead of localStorage
    localStorage.setItem("username", username)

    // send to server-select page without full page refresh
    htmx.ajax("GET", "/select", {target: "body", swap: "innerHTML"});
}

function register() {
    const template = () => html`
        <form @submit=${form}>
            <input name="username" type="text">
            <button type="submit">Submit</button>
        </form>
    `
    const container = document.getElementById("register")
    render(template(), container)
}

register()
