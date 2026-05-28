import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client/core'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_HASURA_HTTP,
  headers: {
    'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
  },
})

const wsUrl = import.meta.env.VITE_HASURA_WS

const link = wsUrl
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query)
        return (
          def.kind === 'OperationDefinition' && def.operation === 'subscription'
        )
      },
      new GraphQLWsLink(
        createClient({
          url: wsUrl,
          connectionParams: async () => ({
            headers: {
              'x-hasura-role': import.meta.env.VITE_HASURA_ROLE,
            },
          }),
        }),
      ),
      httpLink,
    )
  : httpLink

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})
