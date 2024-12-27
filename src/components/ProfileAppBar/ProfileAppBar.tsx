import {
    AppBar,
    Container,
    Grid2 as Grid,
    Toolbar,
    Typography,
} from '@mui/material';


type ProfileAppBarProps = {
    title: string;
};

/**
 * Standardized AppBar component for Profile pages.
 * 
 * @param {title} string - Large text to display as the title on the AppBar.
 */
const ProfileAppBar: React.FC<ProfileAppBarProps> = ({
    title = "",
}) => {
    return (
        <AppBar position="sticky" >
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
                <Toolbar disableGutters={false} sx={{
                }} >
                    <Grid>
                        <Typography variant="h4" component="div" 
                            sx={()=>({
                                width: '100%',
                                })} >
                            { title }
                        </Typography>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default ProfileAppBar;