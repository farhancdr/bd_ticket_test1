const axios = require("axios");


const url = 'https://railspaapi.shohoz.com/v1.0/web/bookings/search-trips-v2?from_city=Chattogram&to_city=Dhaka&date_of_journey=22-Mar-2024&seat_class=S_CHAIR'; // Replace with the actual URL

// Function to fetch and process the JSON data
const fetchAndProcessData = async () => {
  try {
    const response = await axios.get(url);
    const data = await response.data;

    if (data && data.data && data.data.trains) {
      const trains = data.data.trains;

      trains.forEach((train) => {
        const { trip_number, seat_types } = train;

        seat_types.forEach((seat) => {
          const { type, seat_counts } = seat;
          const { online } = seat_counts;

          if (online > 0) {
            const message = `${trip_number} - ${type} has ${online} number of seats available.`;
            console.log(message)
          }
        });
      });
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

fetchAndProcessData();