package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/ShingoYadomoto/nanikiru/backend/data"
)

func handler(rw http.ResponseWriter, _ *http.Request) {
	d := data.GetBeautifier().Beautify()
	j, err := json.Marshal(d)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		log.Printf("failed to marshal to json. err: %s", err.Error())
	}

	rw.Header().Set("Content-Type", "application/json")
	_, err = rw.Write(j)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		log.Printf("failed to write resuponse. err: %s", err.Error())
	}
}

func main() {
	http.HandleFunc("/nanikiru", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
