'use client'

import React from 'react';

import {
    AppBar,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid2 as Grid,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';

import {
} from '@carbon/charts';

//import { Timeline } from '@mui/lab';

import { useReactiveVar } from '@apollo/client';
import { userInfo } from '@/state/cache';

import SkillsWordCloud from '../SkillsWordCloud';

const Profile : React.FC = () => {
    // Temporarily as a reactive var
    const userProfileInfo = useReactiveVar(userInfo);

    return (
        <Container disableGutters={true} maxWidth={false} >
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
                                { userProfileInfo.name }
                            </Typography>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>


            <Container maxWidth={'xl'} sx={{
                paddingTop: '1.25rem',

            }} >
                <Stack spacing={'0.75rem'} >
                    <Card>
                        <CardHeader title={ userProfileInfo.tagline } >
                        </CardHeader>
                        <CardContent>
                            <SkillsWordCloud skills={userProfileInfo.skills} />
                            <Typography gutterBottom variant="h6" component="div">
                                Placeholder content
                            </Typography>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                                {Array.from(Array(6)).map((_, index) => (
                                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                                    <Button>{index + 1}</Button>
                                    </Grid>
                                ))}
                            </Grid>
                            <Divider sx={{
                                marginTop: '1.5rem',
                            }}
                            />
                            <Typography gutterBottom variant="body1" component="div" sx={{
                                marginTop: '1rem',
                            }} >
                                { "This is some placeholder content" }
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom variant="body1" component="div">
                                { "This is some placeholder content" }
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </Container>
    );
};

export default Profile;