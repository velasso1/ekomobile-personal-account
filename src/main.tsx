import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import store from "./app/store/index";
import client from "./app/api/apollo";

import App from "./app/App";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </BrowserRouter>
);
