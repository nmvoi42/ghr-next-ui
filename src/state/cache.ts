import {
    InMemoryCache,
    makeVar,
} from '@apollo/client';

import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

const csrfApolloClientMapDefault: Record<string, ApolloClient<NormalizedCacheObject>> = {};

export const csrfApolloClientMap = makeVar(csrfApolloClientMapDefault);

export const cache = new InMemoryCache();