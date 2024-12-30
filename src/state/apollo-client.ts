import { ApolloClient, ApolloLink, HttpLink, from } from '@apollo/client';

import type { NormalizedCacheObject } from '@apollo/client';

import { cache, csrfApolloClientMap } from './cache';

const httpLink = new HttpLink({
    uri: '/api/graphql',
});

const makeCsrfLink = (csrfToken: string) => {
    return new ApolloLink((operation, forward) => {
        // add the csrf token to the headers
        operation.setContext(({ headers = {} }) => {
            const extraHeaders = {};
            const extraFetchOptions = {};
            return ({
                headers: {
                    ...headers,
                    'X-CSRF-Token': csrfToken ?? 'invalid',
                    ...extraHeaders
                },
                fetchOptions: {
                    ...extraFetchOptions
                }
            });
        } );
        return forward(operation);
    });
};

const getApolloClient = (csrfToken: string): ApolloClient<NormalizedCacheObject> => {
    if ( csrfToken in csrfApolloClientMap() ) {
        return csrfApolloClientMap()[csrfToken];
    }

    // This will not trigger an update, which is desired.
    csrfApolloClientMap()[csrfToken] = new ApolloClient({
        link: from([
            makeCsrfLink(csrfToken),
            httpLink
        ]),
        cache: cache
    });

    return csrfApolloClientMap()[csrfToken];
};


export default getApolloClient;