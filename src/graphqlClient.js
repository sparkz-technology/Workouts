import { GraphQLClient } from "graphql-request";

const url = "https://canlaon.stepzen.net/api/eerie-sloth/__graphql";
const apiKey = process.env.EXPO_PUBLIC_GRAPHQL_API_KEY;

const graphQLClient = new GraphQLClient(url, {
  headers: {
    Authorization: `apikey ${apiKey}`,
  },
});

export default graphQLClient;
