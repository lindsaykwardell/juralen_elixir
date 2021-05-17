import {
  ApolloClient,
  // split,
} from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import * as AbsintheSocket from "@absinthe/socket";
import { Socket as PhoenixSocket } from "phoenix";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
// @ts-ignore
import { hasSubscription } from "@jumpn/utils-graphql";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/api",
});

const absintheSocket = AbsintheSocket.create(
  new PhoenixSocket("ws://localhost:4000/socket", {
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
  socketLink as any,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client