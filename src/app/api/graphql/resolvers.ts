
/**
 * Basic test resolver to respond to a ping query.
 */
const pingResolver = () => {
    return 'pong';
};

const resolvers = {
    Query: {
        ping: pingResolver,
    },
};

export default resolvers;