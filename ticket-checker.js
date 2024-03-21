require('dotenv').config()

const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");

const url =
  "https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2?from_city=Chattogram&to_city=Dhaka&date_of_journey=22-Mar-2024&seat_class=S_CHAIR"; // Replace with the actual URL

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: false,
});

// Function to fetch and process the JSON data
const fetchAndProcessData = async () => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data && data.data && data.data.trains) {
      const trains = data.data.trains;
      let finalMessage = "";

      trains.forEach((train) => {
        const { trip_number, seat_types } = train;

        seat_types.forEach((seat) => {
          const { type, seat_counts } = seat;
          const { online } = seat_counts;

          if (online > 0) {
            const message = `${trip_number} - ${type} has <b> ${online} </b> number of seats available.`;
            finalMessage = `${finalMessage} \n ${message}`;
          }
        });
      });
      bot.sendMessage(process.env.CHANNEL_ID, finalMessage, {parse_mode: 'HTML'} ); // Replace 'YOUR_CHAT_ID' with your actual chat ID
    }
  } catch (error) {
    console.error("Error fetching or processing data:", error);
  }
};

fetchAndProcessData();
