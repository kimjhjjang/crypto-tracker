import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api/CoinApi";
import Chart from "../component/Chart";
import CoinInfo from "../component/CoinInfo";
import Header from "../component/Header";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
`;

const Content = styled.div`
  display: flex;
  width: 100vw;
  height: 780px;
  padding: 25px 200px;
  background-color: ${(props) => props.theme.bgColor};
  justify-content: center;
`;

const ChartBox = styled.div`
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
`;

const CoinBox = styled.div`
  flex-basis: 30%;
  background-color: ${(props) => props.theme.bgColor};
  overflow: hidden;
  overflow-y: scroll;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  position: relative;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid white;
  color: ${(props) => props.theme.textColor};
  border-bottom: 1px solid #e9e9e9;
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const Button = styled.button`
  width: 70px;
  height: 25px;
  border-radius: 10px;
  border: none;
  color: #2f3640;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const CoinName = styled.span`
  cursor: pointer;
  padding: 10px 0px;
  transition: color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const CoinTop = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 115px;
  border-bottom: 1px solid ${(props) => props.theme.textColor};
  justify-content: space-between;
  align-items: flex-end;
  padding: 25px;
  font-weight: 600;
  font-size: 20px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const [coinId, setCoinId] = useState<null | string>(null);
  return (
    <Container>
      <Header />
      <Content>
        <ChartBox>
          <CoinInfo
            coinId={coinId === null ? "btc-bitcoin" : (coinId as any)}
          />
          <Chart coinId={coinId === null ? "btc-bitcoin" : (coinId as any)} />
        </ChartBox>
        <CoinBox>
          <CoinTop>
            <p>코인</p>
            <p>상세보기</p>
          </CoinTop>
          {isLoading ? (
            <Loader>Loading...</Loader>
          ) : (
            <CoinsList>
              {data?.slice(0, 50).map((coin) => (
                <Coin key={coin.id}>
                  <Logo
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}
                    alt={coin.name}
                  />
                  <CoinName onClick={() => setCoinId(coin.id)}>
                    {coin.name}
                  </CoinName>
                  <Link
                    to={{
                      pathname: `${coin.id}`,
                      state: { name: coin.name },
                    }}
                    style={{ position: "absolute", right: 20 }}
                  >
                    <Button>바로가기</Button>
                  </Link>
                </Coin>
              ))}
            </CoinsList>
          )}
        </CoinBox>
      </Content>
    </Container>
  );
}

export default Coins;
