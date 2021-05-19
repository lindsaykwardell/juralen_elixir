import {
  ApolloClient,
  // split,
} from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-link";
import * as AbsintheSocket from "@absinthe/socket";
import { Socket as PhoenixSocket } from "phoenix";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { hasSubscription } from "@jumpn/utils-graphql";

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
});

const absintheSocket = AbsintheSocket.create(
  new PhoenixSocket(process.env.VUE_APP_GRAPHQL_SUB_ENDPOINT || "", {
    // params: () => {
    //   if (Cookies.get("token")) {
    //     return { token: Cookies.get("token") };
    //   } else {
    //     return {};
    //   }
    // },
  })
);

const socketLink = createAbsintheSocketLink(absintheSocket);

const splitLink = split(
  (operation) => hasSubscription(operation.query),
  socketLink as ApolloLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
