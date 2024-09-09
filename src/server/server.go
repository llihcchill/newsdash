package main

import (
	"html/template"
	"log"
	"net/http"
)

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
// END DIRECTORY FUNCTIONS


// MAIN FUNCITON
func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", index)
	http.HandleFunc("/server-select", serverSelect)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
// END MAIN FUNCTION
