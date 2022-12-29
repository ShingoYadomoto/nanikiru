package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/ShingoYadomoto/nanikiru/backend/data"
)

const excludeIDQueryKey = "exclude_id"

type QuestionPai struct {
	Type    string `json:"type"`
	Index   uint8  `json:"index"`
	IsFolou bool   `json:"isFolou"`
	IsBonus bool   `json:"isBonus"`
}

type QuestionSchema struct {
	ID        data.QuestionID `json:"id"`
	PaiList   []QuestionPai   `json:"paiList"`
	Situation string          `json:"situation"`
	Page      uint            `json:"page"`
}

func convert(q *data.Question) (*QuestionSchema, error) {
	parsedPaiList, err := q.Hands.Parse()
	if err != nil {
		return nil, err
	}

	paiList := make([]QuestionPai, len(parsedPaiList))
	for i, parsedPai := range parsedPaiList {

		t, err := parsedPai.Type.ToString()
		if err != nil {
			return nil, err
		}

		idx, err := parsedPai.Index.ToUint8()
		if err != nil {
			return nil, err
		}

		paiList[i] = QuestionPai{
			Type:    t,
			Index:   idx,
			IsFolou: parsedPai.IsFolou,
			IsBonus: parsedPai.IsBonus,
		}
	}

	return &QuestionSchema{
		ID:      q.ID,
		PaiList: paiList,
		Page:    q.Page,
	}, nil
}

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

		question, err := data.GetQuestioner().GetQuestion(excludeIDList)
		if err != nil {
			return nil, err
		}

		convertedQuestion, err := convert(question)
		if err != nil {
			return nil, err
		}

		j, err := json.Marshal(convertedQuestion)
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
