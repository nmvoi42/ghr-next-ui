import {
    Card,
    CardContent,
    CardHeader,
} from '@mui/material';

import EmptyState from '@/components/EmptyState';
import SkillsWordCloud from '@/components/SkillsWordCloud';
import ExperienceTimeline from '@/components/ExperienceTimeline';

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
    name,
    tagline,
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

    let skillsContent = null;
    let experienceContent = null;

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

    const experienceTestValues = [
        {
            "title": "Senior Software Developer",
            "company": "IBM",
            "start": "2020",
            "end": "2024-10",
            "description": "Full stack developer using python, javascript, and SQL within React, NextJS, and Flask",
        },
        {
            "title": "Software Developer",
            "company": "IBM",
            "start": "2016-09",
            "end": "2020",
            "description": null,
        }
    ];
    experienceContent = (
        <ExperienceTimeline experience={experienceTestValues} />
    );

    return (
        <>
            <Card>
                <CardHeader title={ title } titleTypographyProps={{ variant: 'h4' }} sx={{ textTransform: "capitalize" }} />
            </Card>

            <Card>
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