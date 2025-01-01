import { gql } from 'graphql-tag';

const schema = gql`

    type Skill {
        skill: String!
        level: Int
        type: String
        side: String
    }

    type Experience {
        title: String!
        company: String
        start: String
        end: String
        description: String
    }

    type Profile {
        userkey: String!
        name: String
        tagline: String
        skills: [Skill]
        experience: [Experience]
    }

    type Query {
        profile(userkey: String!): Profile
        ping: String
    }

`;

export default schema;