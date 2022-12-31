package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	h := Handler{}

	r := mux.NewRouter()
	r.HandleFunc("/questions", h.CORSMiddleware(h.GetRandomQuestionHandler)).Methods("GET", "OPTIONS")
	r.HandleFunc(`/questions/{question_id:\d+}`, h.CORSMiddleware(h.PostAnswerHandler)).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8888", r))
}
