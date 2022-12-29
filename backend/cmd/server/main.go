package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/ShingoYadomoto/nanikiru/backend/data"
)

const excludeIDQueryKey = "exclude_id"

func getRandomQuestionHandler(rw http.ResponseWriter, r *http.Request) {
	ret, err := func() ([]byte, error) {
		var (
			query            = r.URL.Query()
			excludeIDCSV     = query.Get(excludeIDQueryKey)
			excludeIDStrList = strings.Split(excludeIDCSV, ",")
			excludeIDList    = make([]data.QuestionID, 0, len(excludeIDStrList))
		)

		for _, excludeIDStr := range excludeIDStrList {
			if excludeIDStr == "" {
				continue
			}

			id, err := data.NewQuestionIDFromStr(excludeIDStr)
			if err != nil {
				return nil, err
			}

			excludeIDList = append(excludeIDList, id)
		}

		d, err := data.GetQuestioner().GetQuestion(excludeIDList)
		if err != nil {
			return nil, err
		}

		j, err := json.Marshal(d)
		if err != nil {
			return nil, err
		}

		return j, nil
	}()
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		log.Printf("failed to get byte data. err: %s", err.Error())
	}

	rw.Header().Set("Content-Type", "application/json")
	_, err = rw.Write(ret)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		log.Printf("failed to write resuponse. err: %s", err.Error())
	}
}

// for development
func CORSMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Content-Type", "application/json")

		// preflight用に200でいったん返す
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		next.ServeHTTP(w, r)
	}
}

func main() {
	http.HandleFunc("/questions", CORSMiddleware(getRandomQuestionHandler))
	log.Fatal(http.ListenAndServe(":8888", nil))
}
