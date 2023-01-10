const COIN_API_URL = "https://api.coinpaprika.com";
const OHLCV_URL = "https://ohlcv-api.nomadcoders.workers.dev";

export function fetchCoins() {
  const coins = fetch(`${COIN_API_URL}/v1/coins`).then((res) => res.json());

  return coins;
}

export function fetchCoinInfo(coinId: string) {
  const infoData = fetch(`${COIN_API_URL}/v1/coins/${coinId}`).then((res) =>
    res.json()
  );

  return infoData;
}

export function fetchCoinTickers(coinId: string) {
  const priceData = fetch(`${COIN_API_URL}/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );

  return priceData;
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7;
  const params = {
    coinId,
    endDate: String(endDate),
    startDate: String(startDate),
  };

  const paramsString = new URLSearchParams(params).toString();
  const history = fetch(`${OHLCV_URL}?${paramsString}`).then((res) =>
    res.json()
  );
  return history;
}
