import {
    AppBar,
    Container,
    Grid2 as Grid,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import { ArrowForwardIosRounded } from '@mui/icons-material';

type ProfileAppBarProps = {
    title: string;
};

/**
 * Standardized AppBar component for Profile pages.
 * 
 * @param {string} title - Large text to display as the title on the AppBar.
 */
const ProfileAppBar: React.FC<ProfileAppBarProps> = ({
    title = "",
}) => {
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
                        <Grid container sx={{ width: "100%" }} >
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
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar disableGutters={false} />
        </>
    );
};

export default ProfileAppBar;