import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
// import { WebSocketLink } from "apollo-link-ws";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const httpLink = new HttpLink({
  uri: "https://testvoicesev.platcube.com/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://testvoicesev.platcube.com/graphgl",
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  httpLink,
  wsLink
);

export default new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
