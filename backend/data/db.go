package data

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

const dbFile = "nanikiru.db"

type DB struct {
	*sql.DB
}

func NewDB() *DB {
}

type Nanikiru struct {
	ID     string `db:"id"`
	Hands  string `db:"hands"`
	Answer string `db:"answer"`
	Page   int    `db:"page"`
}

func (db *DB) QueryNanikiruList() ([]Nanikiru, error) {
	rows, err := db.db.Query(fmt.Sprintf("SELECT * from %s", NanikiruTable))
	if err != nil {
		return nil, err
	}

	ret := []Nanikiru{}
	defer rows.Close()
	for rows.Next() {
		r := Nanikiru{}

		err = rows.Scan(&r.ID, &r.Hands, &r.Answer)
		if err != nil {
			return nil, err
		}

		ret = append(ret, r)
	}
	err = rows.Err()
	if err != nil {
		return nil, err
	}

	return ret, nil
}
