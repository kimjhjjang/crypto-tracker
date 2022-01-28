import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api/CoinApi";

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

const InfoBox = styled.div`
position: relative;
  width: 100%;
  flex-basis: 15%;
  background-color: ${(props) => props.theme.bgColor};
  padding: 12px;
  border-bottom: 1px solid ${(props) => props.theme.textColor};;
  
  ul {
    display: flex;
    flex-direction: row;
    dl {
      display: flex;
      flex-direction: row;
    }
  }
  .lastDate {
    position: absolute;
    right: 0px;
    top: 5px;
    font-size: 14px;
    font-weight: 400;
  }
`;

const PriceBox = styled.div`
  display: flex;
  p {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    &:first-child{
      margin-right: 30px;
    }
  }
`;

const Logo = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const PercentUl = styled.ul`
margin: 20px 0px;
  li{
    span:first-child {
      background-color: #fcaa74;
      width: 50px;
      height: 25px;
      border-radius: 10px;
      text-align: center;
      display: inline-block;
      padding-top: 5px;
      vertical-align: middle;
      font-weight: 600;
    }
    span:last-child {
      margin-left: 10px;
      margin-right: 20px;
      font-weight: 600;
    }
  }
`;


export interface ICoinId {
  coinId: string;
}

function CoinInfo({ coinId }: ICoinId) {
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );
  console.log(data);
  return (
    <InfoBox>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <PriceBox>
          <p>
            <Logo
              src={`https://cryptoicon-api.vercel.app/api/icon/${data?.symbol.toLocaleLowerCase()}`}
              alt={data?.name}
            />
            {data?.name}
          </p>
          <p>
            현시세 : 
            <span style={{color:"tomato", paddingLeft:"5px"}}>
              {data?.quotes.KRW.price
              ?.toFixed(2)
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
            원
              </span>
          </p>
          </PriceBox>
          <PercentUl>
            <li>
              <span>15m</span>
              <span>{(data?.quotes.KRW.percent_change_15m)?.toFixed(3)}%</span>
            </li>
            <li>
              <span>30m</span>
              <span>{(data?.quotes.KRW.percent_change_30m)?.toFixed(3)}%</span>
            </li>
            <li>
              <span>1h</span>
              <span>{(data?.quotes.KRW.percent_change_1h)?.toFixed(3)}%</span>
            </li>
            <li>
              <span>6h</span>
              <span>{(data?.quotes.KRW.percent_change_6h)?.toFixed(3)}%</span>
            </li>
            <li>
              <span>12h</span>
              <span>{(data?.quotes.KRW.percent_change_12h)?.toFixed(3)}%</span>
            </li>
            <li>
              <span>24h</span>
              <span>{(data?.quotes.KRW.percent_change_24h)?.toFixed(3)}%</span>
            </li>
           
          </PercentUl>
        </>
      )}
    </InfoBox>
  );
}

export default CoinInfo;
