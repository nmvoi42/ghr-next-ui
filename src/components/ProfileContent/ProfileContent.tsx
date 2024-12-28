import {
    CardContent,
    CardHeader,
} from '@mui/material';

import EmptyState from '@/components/EmptyState';
import SkillsWordCloud from '@/components/SkillsWordCloud';

import type { Skill } from '@/types/ProfileTypes';

type ProfileContentProps = {
    error?: boolean;
    loading?: boolean;
    name?: string;
    tagline?: string;
    skills?: Array<Skill>;
};

/**
 * A component to display provided profile values.
 * 
 * @param {string} tagline - Brief tagline for the person.
 * @param {Array<Skill>} skills - The list of skills
 */
const ProfileContent : React.FC<ProfileContentProps> = ({
    error = false,
    loading = false,
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

    let profileContent = null;

    if ( !loading && ( error || !title && !skills ) ) {
        title = '';
        profileContent = (
            <EmptyState
                error
                message="Unable to display data."
                />
        );
    } else {
        profileContent = (
            <SkillsWordCloud
                loading={loading}
                skills={skills} />
        )
    }

    return (
        <>
            <CardHeader title={ title } />
            <CardContent>
                { profileContent }
            </CardContent>
        </>
    );
}

export default ProfileContent;