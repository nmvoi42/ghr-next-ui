import {
    CardContent,
    CardHeader,
} from '@mui/material';

import SkillsWordCloud from '@/components/SkillsWordCloud';

import type { Skill } from '@/types/ProfileTypes';

type ProfileContentProps = {
    name: string;
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
    name = '',
    tagline = '',
    skills = [],
}) => {

    let title = '';
    if ( name && tagline ) {
        title = name + ' — ' + tagline;
    } else if ( name ) {
        title = name;
    } else if ( tagline ) {
        title = tagline;
    }

    return (
        <>
            <CardHeader title={ title } />
            <CardContent>
                <SkillsWordCloud skills={skills} />
            </CardContent>
        </>
    );
}

export default ProfileContent;