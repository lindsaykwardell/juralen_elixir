import React from "react";
// import { useQuery, useSubscription } from "./gqless";
import {
  ApolloClient,
  gql,
  InMemoryCache,
  split,
  HttpLink,
} from "@apollo/client";
import {
  ApolloProvider,
  useQuery,
  useSubscription,
} from "@apollo/client/react";
// @ts-ignore
import * as AbsintheSocket from "@absinthe/socket";
import { Socket as PhoenixSocket } from "phoenix";
// @ts-ignore
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { getMainDefinition } from "@apollo/client/utilities";
// @ts-ignore
import { hasSubscription } from "@jumpn/utils-graphql";

const httpLink = new HttpLink({
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
  socketLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

interface GreeterProps {
  name: string;
}

const sub = gql`
  subscription NewGameCreated {
    newGameCreated(uuid: "1b76f699-3716-4f93-b897-e3b336fdeee8")
  }
`;

const UserList = () => {
  // const query = useQuery({
  //   suspense: true,
  // });
  // const { newGameCreated } = useSubscription();
  const { loading, error, data } = useQuery(gql`
    query {
      allUsers {
        name
        email
        id
      }
    }
  `);
  const { data: subData, loading: subLoading } = useSubscription(sub);

  return (
    <div>
      <div>
        {!loading &&
          data.allUsers.map(
            (user: { id: number; name: string; email: string }) => (
              <div key={user.id}>
                {user.id}: {user.name} ({user.email})
              </div>
            )
          )}
      </div>
      {/* {newGameCreated({ uuid: "1b76f699-3716-4f93-b897-e3b336fdeee8" })} */}
    </div>
  );
};

const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
  const name = props.name;

  return (
    <ApolloProvider client={client}>
      <section className="w-96 m-auto bg-gray-900 p-4 shadow">
        <form className="flex flex-col text-lg">
          <label className="flex justify-between items-center mb-3">
            Email Address
            <input type="email" className="w-52 p-1 text-black" />
          </label>
          <label className="flex justify-between items-center">
            Password
            <input type="password" className="w-52 p-1 text-black" />
          </label>
        </form>
        <UserList />
      </section>
    </ApolloProvider>
  );
};

export default Greeter;
