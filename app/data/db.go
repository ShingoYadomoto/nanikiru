package data

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

const dbFile = "nanikiru.db"

func NewDB() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", dbFile)
	if err != nil {
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func MustNewDB() *sql.DB {
	db, err := NewDB()
	if err != nil {
		panic(err)
	}

	return db
}

func MustSetup() {
	db := MustNewDB()

	const createTable = `
CREATE TABLE IF NOT EXISTS nanikiru (
	id          SERIAL PRIMARY KEY NOT NULL,
	title       TEXT NOT NULL,
	hands       TEXT NOT NULL,
	answer      TEXT NOT NULL,
	description TEXT NOT NULL
)
`
	_, err := db.Exec(createTable)
	if err != nil {
		panic(err)
	}
}
