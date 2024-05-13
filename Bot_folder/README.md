## Telegram-bot

Для запуска бота потребуется мессенджер Telegram. 
* Команда для запуска:
```sh
node index.js
```
или
```sh
make run-bot
```

Бот расположен по ссылке:
https://t.me/for_CollegeBot

Команда /start дублирует описание бота для проверки доступности бота без работы API.

* Для запроса погоды можно использовать либо команду /weather [название города на английском языке], например 
```sh
/weather London
```

* либо /погода [название города на русском]:

```sh
/погода Лондон
```
* Для сборки docker-образа использовалась команда:

```sh
sudo docker build -t my-bot-image .
```

* Для запуска docker-образа (переменные окружения находятся в файле .env, но для учебного проекта вынесены в команду запуска и в readme):
```sh
sudo docker run -d -p 3000:3000 -e TELEGRAM_BOT_TOKEN=7176506862:AAHDJhsgTVdKUUb3QA79FNLWWCZA0iBNLj8 -e OPENWEATHER_API_KEY=c6218e2abc755c9e981cdde0604aeba9 my-bot-image
```