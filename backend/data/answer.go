package data

import (
	"strings"
)

type Answer string

func (ans Answer) Parse() ([]Pai, error) {
	var (
		paiStrList = strings.Split(string(ans), ",")
		ret        = make([]Pai, len(paiStrList))
	)

	for i, paiStr := range paiStrList {
		p, err := NewAnswerPai(paiStr)
		if err != nil {
			return nil, err
		}

		ret[i] = *p
	}

	return ret, nil
}
