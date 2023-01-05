import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { Header, Loader, Title } from "../../components/components";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../../api";

interface RouteState {
  state: {
    coinName: string;
  };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

// styled commponents
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgColor2};
  max-width: 480px;
  margin: 10px auto 10px auto;

  padding: 10px;
  border-radius: 10px;
`;

const Item = styled.div`
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  text-align: center;

  span:first-child {
    font-size: 10px;
    font-weight: 300;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  max-width: 500px;
  margin: 20px auto 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-width: 480px;
  margin: 0 auto;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  display: block;
  padding: 10px;
  background-color: ${(props) => props.theme.bgColor2};
  border-radius: 10px;
  text-transform: uppercase;
  a {
    display: block;
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

export default function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const priceMatch = useMatch("/coin/:coinId/price");
  const chartMatch = useMatch("/coin/:coinId/chart");
  const {
    state: { coinName },
  } = useLocation() as RouteState;

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ITickersData>(["tickers", coinId], () => fetchCoinTickers(coinId));

  const loading = infoLoading || tickersLoading;

  return (
    <div>
      <Header>
        <Title>{loading ? <Loader>Loading...</Loader> : coinName}</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Container>
            <Item>
              <span>RANK:</span>
              <span>{infoData?.rank}</span>
            </Item>
            <Item>
              <span>SYMBOL:</span>
              <span>{infoData?.symbol}</span>
            </Item>
            <Item>
              <span>OPEN SOURCE:</span>
              <span>{infoData?.open_source ? "YES" : "NO"}</span>
            </Item>
          </Container>
          <Description>{infoData?.description}</Description>
          <Container>
            <Item>
              <span>TOTAL SUPLY:</span>
              <span>{tickersData?.total_supply}</span>
            </Item>
            <Item>
              <span>MAX SUPLY:</span>
              <span>{tickersData?.max_supply}</span>
            </Item>
          </Container>
        </>
      )}

      <hr />
      {/* Price , Chart screen*/}
      <Tabs>
        <Tab isActive={priceMatch !== null}>
          <Link
            to={{
              pathname: "price",
            }}
            state={{ coinName: coinName }}
          >
            Price
          </Link>
        </Tab>
        <Tab isActive={chartMatch !== null}>
          <Link
            to={{
              pathname: "chart",
            }}
            state={{ coinName: coinName }}
          >
            Chart
          </Link>
        </Tab>
      </Tabs>
      <Outlet></Outlet>
    </div>
  );
}
