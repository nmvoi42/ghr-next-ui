import { ApolloClient, HttpLink, ApolloLink, from } from '@apollo/client';
import { cache } from './cache';

const httpLink = new HttpLink({
    uri: '/graphql',
});

const csrfLink = new ApolloLink((operation, forward) => {
    // add the csrf token to the headers
    operation.setContext(({ headers = {} }) => {
        let extraHeaders = {};
        let extraFetchOptions = {};
        return ({
            headers: {
                ...headers,
                'X-CSRFToken': document.getElementById("csrf-token")?.getAttribute("content") || null,
                ...extraHeaders
            },
            fetchOptions: {
                ...extraFetchOptions
            }
        });
    } );
    return forward(operation);
});

const client = new ApolloClient({
    link: from([
        //csrfLink,
        httpLink
    ]),
    cache: cache
});

export default client;