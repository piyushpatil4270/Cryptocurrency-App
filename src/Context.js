export const server="https://api.coingecko.com/api/v3"
export const coinHistory= {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      market: 'CNY',
      symbol: 'BTC',
      function: 'DIGITAL_CURRENCY_DAILY'
    },
    headers: {
      'X-RapidAPI-Key': '39315176b8msh06ed59e28e589e7p111e04jsn49f7d47501c0',
      'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
    }
  };