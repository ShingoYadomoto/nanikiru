build:
	go build -o ./functions/question ./backend/cmd/question/main.go
	cd frontend && npm run build