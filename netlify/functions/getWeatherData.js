const axios = require("axios");

exports.handler = async (event, _context) => {
  try {
    const { city } = event.queryStringParameters;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

    const response = await axios.get(url);

    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
