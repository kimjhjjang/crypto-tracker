const BASE_URL = "https://api.coinpaprika.com/v1";

export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((response) => {
    return response.json();
  });
}

export function fetchCoinInfo(coinId : string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) => {
       return response.json();
    });
}

export function fetchCoinTickers(coinId : string) {
    return fetch(`${BASE_URL}/tickers/${coinId}?quotes=KRW`).then((response) => {
       return response.json();
    });
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 12; //한달전

  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => {
    return response.json();
  });
}
