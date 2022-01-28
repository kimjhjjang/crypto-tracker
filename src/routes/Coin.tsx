import React from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api/CoinApi";
import Header from "../component/Header";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;

const Content = styled.div`
  min-width: 480px;
  width: 480px;
  height: 500px;
  position: relative;
  padding-top: 30px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 20px;
  border: 1px solid ${(props) => props.theme.textColor};
`;

const BackArr = styled.p`
  display: flex;
  width: 300px;
  height: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  border: 3px solid white;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.textColor};
  margin-bottom: 15px;
  font-size: 20px;
  transition: background-color 0.2s ease-in;
  &:hover {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.accentColor};;
  }
`;

const Logo = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 15px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  width: 100%;
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 50px;
`;

const OverView = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverViewItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #f59920;
  padding: 5px;
  border-radius: 10px;
  span:first-child {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 5px;
    color: ${(props) => props.theme.textColor};
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Description = styled.p`
  margin: 20px 30px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
`;

interface PriceData {
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
    KRW: {
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

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

// Interface
interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoading || tickersLoading;

  return (
    <>
      <Helmet>
        <title>
          {state?.name ? state?.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header />
      <Container>
        <Link to={`/`}>
          <BackArr> &larr; BACK COIN LIST </BackArr>
        </Link>
        <Content>
          <Title>
            <Logo
              src={`https://cryptoicon-api.vercel.app/api/icon/${tickersData?.symbol.toLocaleLowerCase()}`}
              alt={tickersData?.name}
            />
            {state?.name
              ? state?.name
              : loading
              ? "Loading..."
              : infoData?.name}
          </Title>
          {loading ? (
            <Loader>Loading...</Loader>
          ) : (
            <>
              <OverView>
                <OverViewItem>
                  <span>Rank :</span>
                  <span>{infoData?.rank}</span>
                </OverViewItem>
                <OverViewItem>
                  <span>Symbol :</span>
                  <span>{infoData?.symbol}</span>
                </OverViewItem>
                <OverViewItem>
                  <span>Price :</span>
                  <span>$ {tickersData?.quotes.KRW.price.toFixed(2)}</span>
                </OverViewItem>
              </OverView>

              <OverView>
                <OverViewItem>
                  <span>Total Suply :</span>
                  <span>{tickersData?.total_supply}</span>
                </OverViewItem>
                <OverViewItem>
                  <span>Max Suply :</span>
                  <span>{tickersData?.max_supply}</span>
                </OverViewItem>
              </OverView>

              <Description>Description :</Description>
              <Description>{infoData?.description}</Description>
            </>
          )}
        </Content>
      </Container>
    </>
  );
}

export default Coin;
