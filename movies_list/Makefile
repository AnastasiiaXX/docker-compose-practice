lint:
	  npx eslint .
lint-fix:
	  npx eslint . --fix
install:
	  npm install
start-server:
		node server.js
.PHONY: request

request:
	curl http://localhost:3000/
.PHONY: movies

movies:
	curl http://localhost:3000/movies
