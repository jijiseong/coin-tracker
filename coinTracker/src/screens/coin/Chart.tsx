import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../../api";
import { Loader } from "../../components/components";
import ApexCharts from "react-apexcharts";

interface IHist {
  close: string;
  high: string;
  low: string;
  market: number;
  open: string;
  time_close: string;
  time_open: string;
  volume: string;
}

export default function Chart() {
  const { coinId } = useOutletContext<{ coinId: string }>();
  const { isLoading, data } = useQuery<IHist[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 5000 }
  );

  return (
    <>
      {isLoading ? (
        <Loader>Loading ... </Loader>
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "sales",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          width="500"
          height="500"
          options={{
            chart: {
              id: "",
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            theme: {
              mode: "dark",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            xaxis: {
              labels: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </>
  );
}
