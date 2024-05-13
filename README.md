# docker-compose-practice
Оба приложения запускаются командой

```sh

docker compose up

```

После запуска docker compose в адресе сервера меняется порт:

http://localhost:3001/
http://localhost:3001/movies

Из .gitignore удален файл .env, т.к. он указан в docker-compose, и без токена бот не запустится.