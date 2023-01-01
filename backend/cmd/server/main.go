package main

import (
	"log"
	"net/http"

	"github.com/ShingoYadomoto/nanikiru/backend/handler"
	"github.com/gorilla/mux"
)

func main() {
	h := handler.Handler{}

	r := mux.NewRouter()
	r.HandleFunc("/questions", h.CORSMiddleware(h.GetRandomQuestionHandler)).Methods("GET", "OPTIONS")
	r.HandleFunc(`/questions/{question_id:\d+}`, h.CORSMiddleware(h.PostAnswerHandler)).Methods("POST", "OPTIONS")

	log.Fatal(http.ListenAndServe(":8888", r))
}
