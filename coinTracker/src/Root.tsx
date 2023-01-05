import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";
import { GlobalStyle } from "./screens/css/global";

function Root() {
  const [isDark, setIsDark] = useState(true);

  const toggleDark = () => {
    const t = isDark ? darkTheme : lightTheme;
    console.log(t);
    setIsDark((current) => !current);
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Outlet context={{ toggleDark: toggleDark }} />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default Root;
