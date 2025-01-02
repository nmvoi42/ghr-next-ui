import {
    AppBar,
    Container,
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
                        <Stack direction="row" sx={{ display: "flex", alignItems: "center" }} >
                            <ArrowForwardIosRounded fontSize="large" />
                            <Typography variant="h3" component="div" sx={{ textTransform: "capitalize" }} >
                                { title }
                            </Typography>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar disableGutters={false} />
        </>
    );
};

export default ProfileAppBar;