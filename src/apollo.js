// client
import { ApolloClient } from 'apollo-client'
// cache
import { InMemoryCache } from 'apollo-cache-inmemory'
// links
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

export const createCache = () => {
  const cache = new InMemoryCache()
  if (process.env.NODE_ENV === 'development') {
    window.secretVariableToStoreCache = cache
  }
  return cache
}

// log erors
const logError = (error) => console.error(error)
// create error link
const createErrorLink = () => onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    logError('GraphQL - Error', {
      errors: graphQLErrors,
      operationName: operation.operationName,
      variables: operation.variables
    })
  }
  if (networkError) {
    logError('GraphQL - NetworkError', networkError)
  }
})
// http link
const createHttpLink = () => new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
})

export const createClient = (cache, requestLink) => {
  return new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      createHttpLink()
    ]),
    cache
  })
};
