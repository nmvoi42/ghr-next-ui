import {
    Card,
    CardContent,
    CardHeader,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import type { Theme } from '@mui/material';

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

    const theme = useTheme();
    const belowSmallSize = useMediaQuery(theme.breakpoints.down('sm'));

    const headerTypographySx = (theme: Theme) => ({
                            color: theme.palette.primary.main,
                            fontWeight: 500,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "1.5rem",
                            },
                            [theme.breakpoints.up('sm')]: {
                                fontSize: '1.32rem',
                                display: "block",
                            },
                            [theme.breakpoints.up('md')]: {
                                fontSize: '2rem',
                                display: "block",
                            },
                            [theme.breakpoints.up('lg')]: {
                                fontSize: '2.5rem',
                                display: "block",
                            },
                        });

    let title = null;
    if ( name && tagline ) {
        if ( belowSmallSize ) {
            title = (
                <Stack direction="column">
                    <Typography variant='h4' component='h2' sx={headerTypographySx} >
                        { name }
                    </Typography>
                    <Typography variant="body1" color="primary" >
                        { tagline }
                    </Typography>
                </Stack>
            );
        } else {
            title = (
                <Typography variant='h4' component='h2' sx={headerTypographySx} >
                    { name + ' - ' + tagline }
                </Typography>
            );
        }
    } else if ( name ) {
        title = (
            <Typography variant='h4' component='h2' sx={headerTypographySx}>
                { name }
            </Typography>
        );
    } else if ( tagline ) {
        title = (
            <Typography variant='h4' component='h2' sx={headerTypographySx}>
                { tagline }
            </Typography>
        );
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
        <Stack spacing={'0.75rem'} >
            <Card elevation={20} >
                <CardHeader
                    title={ title }
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
        </Stack>
    );
}

export default ProfileContent;