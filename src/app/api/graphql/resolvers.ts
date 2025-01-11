
import { getProfileByUserKey } from '@/db/mongodb';

type ProfileResolverArgs = {
    userkey: string;
};

/**
 * Resolver to return the profile of a person.
 */
const profileResolver = async (parent: undefined, args: ProfileResolverArgs) => {
    if ( !args.userkey ) {
        throw new Error("No userkey provided");
    }

    let profile = null;

    const dbProfile = await getProfileByUserKey(args.userkey);
    if ( dbProfile ) {
        profile = {
            userkey: dbProfile.userkey,
            name: dbProfile.name ?? '',
            tagline: dbProfile.tagline ?? '',
            skills: dbProfile.skills ?? [],
            experience: dbProfile.experience ?? [],
            github: dbProfile.github ?? null,
            linkedin: dbProfile.linkedin ?? null,
        };
    } else {
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