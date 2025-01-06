'use client'

import React from 'react';

import {
    Card,
    CardContent,
    Container,
    Grid2 as Grid,
    Link,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { gql, useLazyQuery } from '@apollo/client';

import ProfileAppBar from '@/components/ProfileAppBar';
import ProfileContent from '@/components/ProfileContent';
import EmptyState from '@/components/EmptyState';
import CompetenciesChart from '@/components/CompetenciesChart';

type ProfileProps = {
    hint?: string;
    userkey?: string;
};

/**
 * Simple footer component for the Profile.
 */
const ProfileFooter : React.FC = () => {
    return (
        <Card component="footer" >
            <CardContent>
                <Typography variant="body2">
                    This simple demo site was constructed using Javascript/Typescript, NextJS + React, GraphQL, MaterialUI, Carbon Charts, MongoDB.
                </Typography>
            </CardContent>
        </Card>
    );
};

const GET_PROFILE_QUERY = gql`
        query getProfile($userkey: String!) {
            profile(userkey: $userkey) {
                userkey
                name
                tagline
                skills {
                    skill level type side
                }
                experience {
                    title company start end description
                }
                github
                linkedin
            }
        }
`;

/**
 * Component to retrieve data to populate the Profile and lay out the
 * parts of the profile.
 *
 * @param {string} hint - Suggested alternative in case of lookup failure.
 * @param {string} userkey - The key to reference the profile for lookup.
 */
const Profile : React.FC<ProfileProps> = ({
    hint = null,
    userkey = null,
}) => {

    const theme = useTheme();
    const aboveLargeSize = useMediaQuery(theme.breakpoints.up('lg'));

    const [ doProfileQuery, profileQueryInfo ] = useLazyQuery(GET_PROFILE_QUERY);

    let appBarTitle = '';
    let profileContent = null;

    // If we were passed a userkey, use that to query the
    // profile data.
    if ( userkey ) {
        if ( !profileQueryInfo.called ) {
            // Query the data to populate the profile
            doProfileQuery({
                variables: { userkey: userkey },
            })
            .catch( (err) => {
                console.error("Failure during profile query", err);
            });
        }

        // If this was not populated based on the data lookup, use the modified userkey
        // as the name.
        let profileName = profileQueryInfo.data?.profile?.name;
        if ( !profileName || userkey.toLowerCase() != profileQueryInfo.data?.profile?.userkey ) {
            profileName = userkey.replaceAll('-',' ');
        }
        appBarTitle = profileName;

        // The user was fetched (or is loading), display the related information
        profileContent = (
            <Grid size={{ xs: 12, xl: 9 }} >
                <ProfileContent
                    loading={profileQueryInfo.loading || !profileQueryInfo.called}
                    error={!!profileQueryInfo.error}
                    name={profileName}
                    tagline={profileQueryInfo.data?.profile?.tagline}
                    skills={profileQueryInfo.data?.profile?.skills}
                    experience={profileQueryInfo.data?.profile?.experience}
                />
            </Grid>
        );
    } else {
        // Empty State for profile content if the profile can
        // not be looked up.
        // Should provide a status and suggestion to resolve.
        profileContent = (
            <Grid size={{ xs: 12 }} >
                <Card>
                    <CardContent>
                        <EmptyState
                            error
                            message="Sorry, we don't recognize what you are looking for." />
                        { (hint) ? (
                            <>
                                { "Hint: " }
                                <Link href={'/'+hint} underline="always" color="primary" sx={{ textTransform: "capitalize" }} >
                                    { "Try "+hint }
                                </Link>
                            </>
                        ) : null }
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    // This is temporary data for testing UI layouts prior to connecting the dynamic data
    const staticTestData1 = [
        { competency: 'Curiosity', value: 80 },
        { competency: 'Ownership', value: 70 },
        { competency: 'Communication', value: 80 },
        { competency: 'Adaptability', value: 70 },
        { competency: 'Tenacity', value: 70 },
        { competency: 'Customer Focus', value: 60 },
    ];
    const staticTestData2 = [
        { competency: 'Feature Development', value: 80 },
        { competency: 'Test Writing', value: 60 },
        { competency: 'Customer Support', value: 60 },
        { competency: 'Documentation', value: 50 },
        { competency: 'Optimization', value: 60 },
        { competency: 'Defect Fixing', value: 70 },
        { competency: 'Mentoring', value: 60 },
    ];
    const staticTestData3 = [
        { competency: 'Cybersecurity', value: 70 },
        { competency: 'Performance', value: 70 },
        { competency: 'Accessibility', value: 80 },
        { competency: 'Privacy/GDPR', value: 50 },
        { competency: 'Internationalization', value: 50 },
        { competency: 'Maintainability', value: 80 },
        { competency: 'Responsive Design', value: 70 },
    ];

    let data1 = null;
    let data2 = null;
    let data3 = null;

    if ( userkey ) {
        // This will be filled out with real data
        data1 = staticTestData1;
        data2 = staticTestData2;
        data3 = staticTestData3;
    }

    return (
        <Container disableGutters={true} maxWidth={false} >
            <ProfileAppBar
                title={appBarTitle}
                github={profileQueryInfo.data?.profile?.github}
                linkedin={profileQueryInfo.data?.profile?.linkedin}
            />

            <main>
                <Container maxWidth={'xl'} sx={{
                    paddingTop: '1.25rem',
                }} >
                    <Grid container >
                        {profileContent}

                        {
                        ( data1 || data2 || data3 ) ? (
                        <Grid size={{ xs: 12, xl: 3 }} >
                            <Container disableGutters={true} maxWidth={false} sx={
                                (theme) => ({
                                    mt: "0.75rem",
                                    mx: 0,
                                    [theme.breakpoints.up('xl')]: {
                                        mt: 0,
                                        ml: "0.75rem",
                                        height: "100%",
                                        mb: "0.75rem",
                                        pr: "0.75rem",
                                    },
                                })
                            } >
                                <Card variant='outlined' sx={{ height: "100%" }} >
                                    <CardContent>
                                        <Grid container>
                                            <Grid size={{ xs: 12, sm: 12, xl: 12 }}>
                                                <Typography variant='h5' component='h3' >
                                                    Competencies
                                                </Typography>
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 12 }} sx={{ marginTop: "2.5rem" }} key="competencyChart1" >
                                                <CompetenciesChart competencies={staticTestData1} color='secondary' />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 12 }} sx={{ marginTop: "2.5rem" }} key="competencyChart2" >
                                                <CompetenciesChart competencies={staticTestData2} color='secondary' />
                                            </Grid>
                                            {
                                            // Exclude this chart on smaller screens where space is more valuable
                                            ( aboveLargeSize ) ? (
                                                <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 12 }} sx={{ marginTop: "2.5rem" }} key="competencyChart3" >
                                                    <CompetenciesChart competencies={staticTestData3} color='secondary' />
                                                </Grid>
                                            ) : null
                                            }
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Container>
                        </Grid>
                        ) : null
                        }
                    </Grid>
                </Container>
            </main>

            <Container disableGutters={false} maxWidth='xl' sx={{
                my: "0.75rem",
                pl: "1rem",
                pr: "1rem" }} >
                <ProfileFooter/>
            </Container>
        </Container>
    );
};

export default Profile;