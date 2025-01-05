import {
    AppBar,
    Container,
    Grid2 as Grid,
    IconButton,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import {
    ArrowForwardIosRounded,
    LinkedIn,
    GitHub,
} from '@mui/icons-material';

// Only allow this format of url for these
const LINKEDIN_RE = /^(?:https?:\/\/)?linkedin.com\/.*/i;
const GITHUB_RE = /^(?:https?:\/\/)?github.com\/.*/i;

type ProfileAppBarProps = {
    github?: string;
    linkedin?: string;
    title: string;
};

/**
 * Standardized AppBar component for Profile pages.
 * 
 * @param {string} github - Link to the user's github.
 * @param {string} linkedin - Link to the user's linkedin.
 * @param {string} title - Large text to display as the title on the AppBar.
 */
const ProfileAppBar: React.FC<ProfileAppBarProps> = ({
    github,
    linkedin,
    title = "",
}) => {

    let linkedInUrl = null;
    let githubUrl = null;

    if ( linkedin != null && LINKEDIN_RE.test(linkedin) ) {
        linkedInUrl = linkedin;
    }
    if ( github != null && GITHUB_RE.test(github) ) {
        githubUrl = github;
    }

    return (
        <>
            <AppBar position="fixed" >
                <Container id={"toolbar_container"} disableGutters={true} maxWidth={false} sx={(theme) => ({
                    [theme.breakpoints.down('xl')]: {
                        paddingLeft: '0',
                    },
                    [theme.breakpoints.up('xl')]: {
                        paddingLeft: '1rem',
                    },
                    [theme.breakpoints.up(1700)]: {
                        paddingLeft: '3rem',
                    },
                    [theme.breakpoints.up(1800)]: {
                        paddingLeft: '5rem',
                    },
                })} >
                    <Toolbar disableGutters={false} >
                        <Grid container sx={{ display: "flex", alignItems: "center", width: "100%" }} >
                            <Grid size={9} >
                                <Stack direction="row" sx={{ alignItems: "center", width: "100%" }} >
                                    <ArrowForwardIosRounded fontSize="large" />
                                    <Typography variant="h3" component="h1"
                                        sx={(theme) => ({
                                            fontSize: '0',
                                            textTransform: "capitalize",
                                            [theme.breakpoints.up('sm')]: {
                                                fontSize: '1.7rem',
                                                display: "block",
                                            },
                                            [theme.breakpoints.up('md')]: {
                                                fontSize: '2.5rem',
                                                display: "block",
                                            },
                                            [theme.breakpoints.up('lg')]: {
                                                fontSize: '3rem',
                                                display: "block",
                                            },
                                        })}
                                    >
                                        { title }
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid size={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                {
                                ( linkedInUrl ) ? (
                                    <IconButton size="large" href={ linkedInUrl } target="_blank" >
                                        <LinkedIn fontSize="large" titleAccess="LinkedIn" />
                                    </IconButton>
                                ) : null
                                }
                                {
                                ( githubUrl ) ? (
                                    <IconButton size="large" href={ githubUrl } target="_blank" >
                                        <GitHub fontSize="large" titleAccess="GitHub" />
                                    </IconButton>
                                ) : null
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar disableGutters={false} />
        </>
    );
};

export default ProfileAppBar;