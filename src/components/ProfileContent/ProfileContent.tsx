import {
    Card,
    CardContent,
    CardHeader,
} from '@mui/material';

import EmptyState from '@/components/EmptyState';
import SkillsWordCloud from '@/components/SkillsWordCloud';
import ExperienceTimeline from '@/components/ExperienceTimeline';

import type { Experience, Skill } from '@/types/ProfileTypes';

type ProfileContentProps = {
    error?: boolean;
    loading?: boolean;
    name?: string;
    tagline?: string;
    skills?: Skill[];
    experience?: Experience[];
};

/**
 * A component to display provided profile values.
 * 
 * @param {Skill[]} skills - The list of skills
 * @param {string} tagline - Brief tagline for the person.
 */
const ProfileContent : React.FC<ProfileContentProps> = ({
    error = false,
    experience = [],
    loading = false,
    name,
    skills = [],
    tagline,
}) => {

    let title = '';
    if ( name && tagline ) {
        title = name + ' — ' + tagline;
    } else if ( name ) {
        title = name;
    } else if ( tagline ) {
        title = tagline;
    }

    let skillsContent = null;
    let experienceContent = null;

    // Create the content based on the skills data
    if ( !loading && ( error || !title && !skills ) ) {
        title = '';
        skillsContent = (
            <EmptyState
                error
                message="Unable to display data."
                />
        );
    } else {
        skillsContent = (
            <SkillsWordCloud
                loading={loading}
                skills={skills} />
        )
    }

    // Create the content based on the experience data
    if ( !loading && ( error || !title && !experience ) ) {
        experienceContent = (
            <EmptyState
                error
                message="Unable to display data."
                />
        );
    } else {
        experienceContent = (
            <ExperienceTimeline
                loading={loading}
                experience={experience} />
        );
    }

    return (
        <>
            <Card elevation={20} >
                <CardHeader
                    title={ title }
                    titleTypographyProps={{
                        variant: 'h4',
                        sx: (theme) => ({
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                        }),
                    }}
                    sx={{
                        textTransform: "capitalize",
                        py: "0.5rem",
                    }} />
            </Card>

            <Card variant="outlined" >
                <CardContent>
                    { skillsContent }
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    { experienceContent }
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileContent;