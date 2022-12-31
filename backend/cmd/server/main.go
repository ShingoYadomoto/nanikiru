package main

import (
	"log"
	"net/http"
)

func main() {
	h := Handler{}

	http.HandleFunc("/questions", h.CORSMiddleware(h.GetRandomQuestionHandler))
	log.Fatal(http.ListenAndServe(":8888", nil))
}
