package data

import (
	_ "github.com/mattn/go-sqlite3"
)

type Beautifier struct {
	data []Nanikiru
}

func newBeautifier() *Beautifier {
	return &Beautifier{data: data}
}

var nanikiruBeautifier *Beautifier

func init() {
	nanikiruBeautifier = newBeautifier()
}

func GetBeautifier() *Beautifier {
	return nanikiruBeautifier
}

type Nanikiru struct {
	Hands  string `db:"hands"`
	Answer string `db:"answer"`
	Page   int    `db:"page"`
}

func (b *Beautifier) Beautify() []Nanikiru {
	return b.data
}
