import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import router from "./Router";
import { theme } from "./theme";
import Root from "./Root";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <Root />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
