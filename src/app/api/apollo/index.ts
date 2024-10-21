import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-lk2.ekomobile.ru/graphql",
  headers: {
    "X-Auth-Client-Key": `${import.meta.env.VITE_TEMP_TOKEN}`,
    "X-Auth-Token": `${localStorage.getItem("token")}`,
  },
  cache: new InMemoryCache(),
});

export default client;
