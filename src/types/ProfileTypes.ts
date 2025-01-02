
export type Skill = {
    skill: string;
    level: number;
    type: 'Language'|'Framework';
    side: 'Frontend'|'Backend';
};

export type Experience = {
    title: string;
    company: string;
    start: string;
    end?: string | null;
    description?: string | null;
};

export type UserInfo = {
    userkey: string;
    name: string;
    tagline: string;
    skills: Array< Skill >;
    experience: Array< Experience >;
};