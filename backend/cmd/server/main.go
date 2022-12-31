package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	h := Handler{}

	r := mux.NewRouter()
	r.HandleFunc("/questions", h.CORSMiddleware(h.GetRandomQuestionHandler)).Methods("GET")
	r.HandleFunc(`/questions/{question_id:\d+}`, h.CORSMiddleware(h.PostAnswerHandler)).Methods("POST")

	log.Fatal(http.ListenAndServe(":8888", nil))
}
