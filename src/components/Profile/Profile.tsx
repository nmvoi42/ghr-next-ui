'use client'

import React from 'react';

import {
    Card,
    CardContent,
    Container,
    Link,
    Stack,
    Typography,
} from '@mui/material';

//import { Timeline } from '@mui/lab';

import { gql, useLazyQuery } from '@apollo/client';

import ProfileAppBar from '@/components/ProfileAppBar';
import ProfileContent from '@/components/ProfileContent';
import EmptyState from '../EmptyState';

type ProfileProps = {
    hint?: string;
    userkey?: string;
};

/**
 * Simple footer component for the Profile.
 */
const ProfileFooter : React.FC = () => {
    return (
        <Card>
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
            <ProfileContent
                loading={profileQueryInfo.loading || !profileQueryInfo.called}
                error={!!profileQueryInfo.error}
                name={profileName}
                tagline={profileQueryInfo.data?.profile?.tagline}
                skills={profileQueryInfo.data?.profile?.skills}
            />
        );
    } else {
        // Empty State for profile content if the profile can
        // not be looked up.
        // Should provide a status and suggestion to resolve.
        profileContent = (
            <CardContent>
                <EmptyState
                    error
                    message="Sorry, we don't recognize what you are looking for." />
                { (hint)?(
                    <>
                        { "Hint: " }
                        <Link href={'/'+hint} underline="always" color="primary" sx={{ textTransform: "capitalize" }} >
                            { "Try "+hint }
                        </Link>
                    </>
                ):'' }
            </CardContent>
        );
    }

    return (
        <Container disableGutters={true} maxWidth={false} >
            <ProfileAppBar title={appBarTitle}  />

            <Container maxWidth={'xl'} sx={{
                paddingTop: '1.25rem',
            }} >
                <Stack spacing={'0.75rem'} >
                    <Card>
                        {profileContent}
                    </Card>

                    <ProfileFooter/>
                </Stack>
            </Container>
        </Container>
    );
};

export default Profile;