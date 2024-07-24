import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_NHOST_GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  //   const session: any = Cookies.get("nhostSession");
  //   const token = JSON.parse(session).accessToken;

  //   console.log("skfhdjs", token);
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer {YourToken}`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
