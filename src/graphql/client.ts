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
// @ts-ignore
import { hasSubscription } from "@jumpn/utils-graphql";
import { useProfileStore } from "@/hooks/useProfile";

// const profile = useProfileStore();

const httpLink = createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_ENDPOINT,
});

const authLink = new ApolloLink((operation, forward) => {
  // if (profile.isLoggedIn) {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer ${profile.token}`,
  //     },
  //   });
  // }

  return forward(operation);
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
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
