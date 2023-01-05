import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { Header, Loader, Title } from "../components/components";

const Container = styled.div`
  padding-top: 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  align-items: center;
  background-color: ${(props) => props.theme.bgColor2};
  margin: 10px;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};

  a {
    padding: 10px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
    transition: color 0.1s ease-in;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export default function Coins() {
  const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/coin/${coin.id}`,
                }}
                state={{ coinName: coin.name }}
              >
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <div>{coin.name}</div>
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
