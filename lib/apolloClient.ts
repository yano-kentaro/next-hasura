/** ================================================================
 * apolloClient.ts
 * apollo client for the API
 * @author yano-kentaro
 * @date 2022-08-11
================================================================= */

// ----------------------------------
// import
import {
    ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject
} from '@apollo/client'
import 'cross-fetch/polyfill'

// ----------------------------------
// export
// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_HASURA_ENDPOINT,
            headers: {
                "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET
            }
        })
    })
}

export const initializeApollo = (initialState = null) => {
    const _apolloClient = apolloClient ?? createApolloClient()

    if (typeof window === 'undefined') return _apolloClient

    if (!apolloClient) apolloClient = _apolloClient

    return _apolloClient
}