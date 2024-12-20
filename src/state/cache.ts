import {
    InMemoryCache,
    makeVar
} from '@apollo/client';

export const userInfo = makeVar({
    userkey: 'john-doe',
    name: "John Doe",
    tagline: "Fullstack Developer",
    skills: [
        { skill: "Python", level: 5},
        { skill: "Javascript", level: 5},
        { skill: "Typescript", level: 4},
        { skill: "NextJS", level: 4},
        { skill: "ReactJS", level: 4},
        { skill: "SQL", level: 4},
        { skill: "PostgreSQL", level: 4},
        { skill: "GraphQL", level: 4},
        { skill: "PHP", level: 4},
        { skill: "Bootstrap UI", level: 3},
        { skill: "Material UI", level: 1},
        { skill: "Laravel", level: 1},
    ],
    experience: [
        {
            title: "Senior Software Developer",
            company: "IBM",
            start: "2024-10",
            end: "2020",
            description: "Full stack developer using python, javascript, within React, NextJS, and Flask",
        },
        {
            title: "Software Developer",
            company: "IBM",
            start: "2016-09",
            end: "2020",
        },
    ],
});

export const cache = new InMemoryCache();