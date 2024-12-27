import {
    CardContent,
    CardHeader,
} from '@mui/material';

import SkillsWordCloud from '@/components/SkillsWordCloud';

import type { Skill } from '@/types/ProfileTypes';

type ProfileContentProps = {
    tagline: string;
    skills: Array<Skill>;
};

/**
 * A component to display provided profile values.
 * 
 * @param {string} tagline - Brief tagline for the person.
 * @param {Array<Skill>} skills - The list of skills
 */
const ProfileContent : React.FC<ProfileContentProps> = ({
    tagline = '',
    skills = [],
}) => {

    return (
        <>
            <CardHeader title={ tagline } />
            <CardContent>
                <SkillsWordCloud skills={skills} />
            </CardContent>
        </>
    );
}

export default ProfileContent;