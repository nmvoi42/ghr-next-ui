
import type { UserInfo } from '@/types/ProfileTypes';

const testProfileInfo : UserInfo = {
    userkey: 'john-doe',
    name: "John Doe",
    tagline: "Fullstack Developer",
    skills: [ // Some sample skills for testing
        { skill: "Python", level: 5, type: "Language", side: "Backend"},
        { skill: "Javascript", level: 5, type: "Language", side: "Frontend"},
        { skill: "Typescript", level: 4, type: "Language", side: "Frontend"},
        { skill: "NextJS", level: 4, type: "Framework", side: "Frontend"},
        { skill: "ReactJS", level: 4, type: "Framework", side: "Frontend"},
        { skill: "SQL", level: 4, type: "Language", side: "Backend"},
        { skill: "PostgreSQL", level: 4, type: "Language", side: "Backend"},
        { skill: "MongoDB", level: 2, type: "Language", side: "Backend"},
        { skill: "GraphQL", level: 4, type: "Framework", side: "Backend"},
        { skill: "PHP", level: 4, type: "Language", side: "Backend"},
        { skill: "Bootstrap UI", level: 3, type: "Framework", side: "Frontend"},
        { skill: "Material UI", level: 2, type: "Framework", side: "Frontend"},
        { skill: "Laravel", level: 1, type: "Framework", side: "Backend"},
        { skill: "Java", level: 3, type: "Language", side: "Backend"},
        { skill: "C++", level: 2, type: "Language", side: "Backend"},
        { skill: "Spring", level: 1, type: "Framework", side: "Backend"},
    ],
    experience: [
        {
            title: "Senior Software Developer",
            company: "IBM",
            start: "2020",
            end: "2024-10",
            description: "Full stack developer using python, javascript, within React, NextJS, and Flask",
        },
        {
            title: "Software Developer",
            company: "IBM",
            start: "2016-09",
            end: "2020",
        },
    ],
};

/**
 * Resolver to return the profile of a person.
 */
const profileResolver = () => {
    return testProfileInfo;
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