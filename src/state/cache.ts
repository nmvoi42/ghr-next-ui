import {
    InMemoryCache,
    makeVar
} from '@apollo/client';

export const userInfo = makeVar({
    userkey: 'john-doe',
    name: "John Doe",
    tagline: "Fullstack Developer",
    skills: [ // Some sample skills for testing
        { skill: "Python", level: 5, type: "Language"},
        { skill: "Javascript", level: 5, type: "Language"},
        { skill: "Typescript", level: 4, type: "Language"},
        { skill: "NextJS", level: 4, type: "Framework"},
        { skill: "ReactJS", level: 4, type: "Framework"},
        { skill: "SQL", level: 4, type: "Language"},
        { skill: "PostgreSQL", level: 4, type: "Language"},
        { skill: "MongoDB", level: 2, type: "Language"},
        { skill: "GraphQL", level: 4, type: "Framework"},
        { skill: "PHP", level: 4, type: "Language"},
        { skill: "Bootstrap UI", level: 3, type: "Framework"},
        { skill: "Material UI", level: 2, type: "Framework"},
        { skill: "Laravel", level: 1, type: "Framework"},
        { skill: "Java", level: 3, type: "Language"},
        { skill: "C++", level: 2, type: "Language"},
        { skill: "Spring", level: 1, type: "Framework"},
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
});

export const cache = new InMemoryCache();