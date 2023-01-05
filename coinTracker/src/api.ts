const BASE_URL = "https://api.coinpaprika.com";

export function fetchCoins() {
  const coins = fetch(`${BASE_URL}/v1/coins`).then((res) => res.json());

  return coins;
}

export function fetchCoinInfo(coinId: string) {
  const infoData = fetch(`${BASE_URL}/v1/coins/${coinId}`).then((res) =>
    res.json()
  );

  return infoData;
}

export function fetchCoinTickers(coinId: string) {
  const priceData = fetch(`${BASE_URL}/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );

  return priceData;
}
