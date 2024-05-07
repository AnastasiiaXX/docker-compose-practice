import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
// import dotenv from 'dotenv';
import { configDotenv } from 'dotenv';

configDotenv();

const apiKey = process.env.OPENWEATHER_API_KEY;
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет! Я бот погоды. Чтобы получить погоду в вашем городе, просто напишите /weather <название города>. Например: /weather Moscow`);
});

bot.onText(/\/weather (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const cityName = match[1];
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
       .then(response => {
            const weatherData = response.data;
            const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);
            bot.sendMessage(chatId, `Temperature: ${temperatureCelsius}°C, Humidity: ${weatherData.main.humidity}%`);
            // bot.sendMessage(chatId, `Temperature: ${weatherData.main.temp}, Humidity: ${weatherData.main.humidity}`);
        })
       .catch(error => bot.sendMessage(chatId, 'Error fetching weather data'));
});