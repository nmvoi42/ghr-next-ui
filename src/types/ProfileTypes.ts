
type Skill = {
    skill: string;
    level: number;
    type: 'Language'|'Framework';
    side: 'Frontend'|'Backend';
};

type Experience = {
    title: string;
    company: string;
    start: string;
    end?: string;
    description?: string;
};

type UserInfo = {
    userkey: string;
    name: string;
    tagline: string;
    skills: Array< Skill >;
    experience: Array< Experience >;
};