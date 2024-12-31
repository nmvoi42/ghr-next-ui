
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
        console.time();
        console.log("Before connect",process.env.NODE_ENV);
        console.timeLog();
        await mongodbClient.connect();
        console.log("After connect");
        console.timeLog();
        const db = mongodbClient.db(process.env.DB_NAME);
        console.log("After db");
        console.timeLog();
        const collection = db.collection('profiles');
        console.log("After collection");
        console.timeLog();
        profile = await collection.findOne({userkey: args.userkey});
        console.log("After find");
        console.timeLog();
    } finally {
        await mongodbClient.close();
        console.log("After close");
        console.timeLog();
        console.timeEnd();
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