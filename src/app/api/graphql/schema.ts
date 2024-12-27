import { gql } from 'graphql-tag';

const schema = gql`
    type Query {
        ping: String
    }
`;

export default schema;