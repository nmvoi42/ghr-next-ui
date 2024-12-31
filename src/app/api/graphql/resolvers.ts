
import { client as mongodbClient } from '@/db/mongodb';

/*
Profile data will be of a format like:

const testProfileInfo : UserInfo = {
    userkey: 'john-doe',
    name: "John Doe",
    tagline: "Fullstack Developer",
    skills: [
        { skill: "Python", level: 5, type: "Language", side: "Backend"},
        { skill: "Javascript", level: 5, type: "Language", side: "Frontend"},
    ],
    experience: [
        {
            title: "Senior Software Developer",
            company: "IBM",
            start: "2020",
            end: "2024-10",
            description: "Full stack developer using python, javascript, within React, NextJS, and Flask",
        },
    ],
};
*/

type ProfileResolverArgs = {
    userkey: string;
};

/**
 * Resolver to return the profile of a person.
 */
const profileResolver = async (parent: undefined, args: Record<string,ProfileResolverArgs>) => {
    if ( !args.userkey ) {
        throw new Error("No userkey provided");
    }

    let profile = null;
    try {
        await mongodbClient.connect();
        const db = mongodbClient.db(process.env.DB_NAME);
        const collection = db.collection('profiles');
        profile = await collection.findOne({userkey: args.userkey});
    } finally {
        await mongodbClient.close();
    }

    if ( !profile ) {
        throw new Error("Invalid userkey specified");
    }
    return profile;
};

/**
 * Basic test resolver to respond to a ping query.
 */
const pingResolver = () => {
    return 'pong';
};

const resolvers = {
    Query: {
        profile: profileResolver,
        ping: pingResolver,
    },
};

export default resolvers;