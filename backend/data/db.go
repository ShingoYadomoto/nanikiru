package data

import (
	"errors"
	"math/rand"
	"strconv"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

type QuestionID uint

func NewQuestionIDFromStr(s string) (QuestionID, error) {
	i, err := strconv.Atoi(s)
	if err != nil {
		return 0, err
	}

	return QuestionID(i), nil
}

type Questioner struct {
	data map[QuestionID]Nanikiru
}

func newQuestioner() *Questioner {
	dl := newData()

	m := map[QuestionID]Nanikiru{}
	for i, d := range dl {
		m[QuestionID(i+1)] = d
	}
	return &Questioner{data: m}
}

var nanikiruQuestioner *Questioner

func init() {
	nanikiruQuestioner = newQuestioner()
	rand.Seed(time.Now().UnixNano())
}

func GetQuestioner() *Questioner {
	return nanikiruQuestioner
}

type Nanikiru struct {
	ID     uint
	Hands  string
	Answer string
	Page   int
}

func (q *Questioner) GetQuestion(excludeIDList []QuestionID) (*Nanikiru, error) {
	var (
		max          = len(q.data)
		maxfailCount = max - len(excludeIDList)
		excludeIDMap = map[QuestionID]struct{}{}
	)

	for _, excludeID := range excludeIDList {
		excludeIDMap[excludeID] = struct{}{}
	}

	for {
		if maxfailCount == 0 {
			return nil, errors.New("over max fail count")
		}

		randomID := QuestionID(rand.Intn(max + 1))
		if _, ng := excludeIDMap[randomID]; ng {
			maxfailCount--
			continue
		}

		ret := q.data[randomID]

		return &ret, nil
	}
}
