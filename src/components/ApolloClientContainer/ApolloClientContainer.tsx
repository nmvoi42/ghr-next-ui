'use client'

import React, {ReactNode} from 'react';

import { ApolloProvider } from '@apollo/client';
import { default as apolloClient } from '@/state/apollo-client';

type ApolloClientContainerProps = {
    children: ReactNode,
} 

const ApolloClientContainer : React.FC<ApolloClientContainerProps> = ( { children } ) => {
    return (
        <ApolloProvider client={apolloClient} >
            {children}
        </ApolloProvider>
    );
};

export default ApolloClientContainer;