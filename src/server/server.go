package main

import (
	"html/template"
	"log"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("../html/main.html"))

	tmpl.Execute(w, nil)
}

func serverSelect(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("../html/server-select.html"))

	tmpl.Execute(w, nil)
}

func main() {
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", index)
	http.HandleFunc("/server-select", serverSelect)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
