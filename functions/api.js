const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiUrl = "https://gorilla.minutesnetworktoken.io";
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  };

  try {
    const responses = await Promise.all([
      fetch(apiUrl + "/test/live-platform-users/today"),
      fetch(apiUrl + "/test/calls-processed/today"),
      fetch(apiUrl + "/test/revenue/today"),
      fetch(apiUrl + "/test/live-channels"),
      fetch(apiUrl + "/test/network-load"),
    ]);

    const data = await Promise.all(responses.map(response => response.json()));

    const [livePlatformUsers, callsProcessed, revenue, liveChannels, networkLoad] = data.map(d => d.data);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        livePlatformUsers,
        callsProcessed,
        revenue,
        liveChannels,
        networkLoad,
      }),
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "An error occurred while fetching data." }),
    };
  }
};
