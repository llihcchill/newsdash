package main

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// WEBSOCKET STUFF
var servers []int

// struct used to normal HTTP request to websocket connection
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

// END WEBSOCKET STUFF

// RENDER TEMPLATE FUNCTION
func renderTemplate(w http.ResponseWriter, r *http.Request, file string) {
	tmpl := template.Must(template.ParseFiles(file))
	tmpl.Execute(w, nil)
}

// END RENDER TEMPLATE FUNCTION

// DIRECTORY FUNCTIONS
func index(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, r, "../html/main.html")
}

func serverSelect(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, r, "../html/server-select.html")
}

func createServer(w http.ResponseWriter, r *http.Request) {
	renderTemplate(w, r, "../html/create-server.html")
}

// // sub websocket directory functions

func wsCreateServer(w http.ResponseWriter, r *http.Request) {

	// WS write message part
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	log.Println("client has connected which is good to know!")

	err = ws.WriteMessage(1, []byte("howdy!"))
	if err != nil {
		log.Println(err)
	}

	// WS read message part
	for {
		messageType, p, err := ws.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		// print byte data
		//log.Println(p)

		var data map[string]interface{}

		if err := json.Unmarshal(p, &data); err != nil {
			panic(err)
		}

		// print key "reference" from JSON sent by client
		// then store as a variable
		log.Println(data["reference"].(float64))
		reference := data["reference"].(float64)

		// the servers variable will be used as a way to reference all servers and display them
		servers = append(servers, int(reference))

		if err := ws.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

// // end sub websocket directory functions

// END DIRECTORY FUNCTIONS

// MAIN FUNCITON
func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", index)
	http.HandleFunc("/server-select", serverSelect)
	http.HandleFunc("/create-server", createServer)

	http.HandleFunc("/ws", wsCreateServer)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

// END MAIN FUNCTION
