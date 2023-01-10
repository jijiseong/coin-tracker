import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { GlobalStyle } from "./screens/css/global";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atoms";

function Root() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Outlet context />
      <ReactQueryDevtools />
    </ThemeProvider>
  );
}

export default Root;
