'use client'

import React, {ReactNode} from 'react';

import { ApolloProvider } from '@apollo/client';
import { default as getApolloClient } from '@/state/apollo-client';

type ApolloClientContainerProps = {
    children: ReactNode,
    csrfToken: string,
} 

/**
 * Container to bring in the Apollo Provider and mark the client
 * boundary within NextJS.
 *
 * @param {children} children - The children components in the container.
 */
const ApolloClientContainer : React.FC<ApolloClientContainerProps> = ( {
    csrfToken,
    children,
} ) => {
    const apolloClient = getApolloClient(csrfToken);

    return (
        <ApolloProvider client={apolloClient} >
            {children}
        </ApolloProvider>
    );
};

export default ApolloClientContainer;