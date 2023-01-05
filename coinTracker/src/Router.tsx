import { createBrowserRouter } from "react-router-dom";
import ErrComponent from "./components/ErrComponent";
import Root from "./Root";
import Coins from "./screens/Coins";
import Coin from "./screens/coin/Coin";
import Price from "./screens/coin/Price";
import Chart from "./screens/coin/Chart";
// import NotFound from "./screens/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
        errorElement: <ErrComponent />,
      },
      {
        path: "coin/:coinId",
        element: <Coin />,
        children: [
          {
            path: "price",
            element: <Price />,
          },
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
    // errorElement: <NotFound />,
  },
]);

export default router;
