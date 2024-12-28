'use client'

import React from 'react';

import {
    Card,
    CardContent,
    Container,
    Link,
    Stack,
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
            </CardContent>
        </Card>
    );
};

const GET_PROFILE_QUERY = gql`
        query getProfile {
            profile {
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
            doProfileQuery({
                variables: { userkey: userkey },
            })
            .catch( (err) => {
                console.error("Failure during profile query", err);
            });
        } else {
            appBarTitle = profileQueryInfo.data?.profile?.name;
        }

        // The user was fetched (or is loading), display the related information
        profileContent = (
            <ProfileContent
                loading={profileQueryInfo.loading || !profileQueryInfo.called}
                error={!!profileQueryInfo.error}
                name={profileQueryInfo.data?.profile?.name}
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
            <ProfileAppBar title={appBarTitle} />

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