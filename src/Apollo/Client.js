import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "apollo-link-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:12000/graphql",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:12000/graphql",
  options: {
    reconnect: true,
  },
});

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
