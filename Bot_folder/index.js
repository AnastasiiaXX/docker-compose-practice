import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { configDotenv } from 'dotenv';

configDotenv();

const apiKey = process.env.OPENWEATHER_API_KEY;
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Привет! Я бот погоды. Чтобы получить погоду в вашем городе, 
  просто напишите /weather <название города> или /погода <название города>. Например: /weather Moscow или /погода Москва`);
});

bot.onText(/\/(weather|погода) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const command = match[1];
  const cityName = match[2];
  
  if (command === 'weather' || command === 'погода') {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}`)
      .then(response => {
        const weatherData = response.data;
        const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2);
        bot.sendMessage(chatId, `Температура: ${temperatureCelsius}°C, Влажность: ${weatherData.main.humidity}%`);
      })
      .catch(error => bot.sendMessage(chatId, 'Ошибка при получении данных о погоде'));
  }
});
