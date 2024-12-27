import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

import schema from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
    resolvers,
    typeDefs: schema,
    plugins: [
        ApolloServerPluginLandingPageDisabled()
    ],
    introspection: false,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as POST };
