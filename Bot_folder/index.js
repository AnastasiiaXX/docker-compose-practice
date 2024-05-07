import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const token = '7176506862:AAHDJhsgTVdKUUb3QA79FNLWWCZA0iBNLj8';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/weather (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const cityName = match[1];
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c6218e2abc755c9e981cdde0604aeba9`)
       .then(response => {
            const weatherData = response.data;
            const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);
            bot.sendMessage(chatId, `Temperature: ${temperatureCelsius}°C, Humidity: ${weatherData.main.humidity}%`);
            // bot.sendMessage(chatId, `Temperature: ${weatherData.main.temp}, Humidity: ${weatherData.main.humidity}`);
        })
       .catch(error => bot.sendMessage(chatId, 'Error fetching weather data'));
});