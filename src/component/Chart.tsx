import ReactApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchCoinHistory } from "../api/CoinApi";
import { isDarkAtom } from "../recoil/ThemeSetting";

export interface ICoinId {
  coinId: string;
};

export const defaultTodos: ICoinId = {
    coinId : "btc-bitcoin"
};

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const ViewChart = styled.div`
    flex-basis: 75%;
`

function Chart({ coinId }: ICoinId) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(
      ["history", coinId],
      () => fetchCoinHistory(coinId) ,
    );
    return (
      <ViewChart>
        {isLoading ? (
          "Loading Chart..."
        ) : (
          <ReactApexChart
            type="candlestick"
            series={[
              {
                data: data?.map((value) => ({
                  x: new Date(value.time_close),
                  y: [
                    value.open.toFixed(2),
                    value.high.toFixed(2),
                    value.low.toFixed(2),
                    value.close.toFixed(2),
                  ],
                })),
              },
            ]}
            options={{
              chart: {
                type: "candlestick",
                toolbar: {
                  show: false,
                },
                height: '400px' 
              },
              title: {
                text: "CandleStick Chart",
                align: "left",
              },
              xaxis: {
                type: "datetime",
              },
              yaxis: {
                tooltip: {
                  enabled: true,
                },
                show: false,
              },
              tooltip: {
                theme: isDark ? "dark" : "light",
              },
            }}
          />
        )}
      </ViewChart>
    );
}

export default Chart;
