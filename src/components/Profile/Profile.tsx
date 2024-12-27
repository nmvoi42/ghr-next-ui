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

import { useReactiveVar } from '@apollo/client';

import { userInfo } from '@/state/cache';
import ProfileAppBar from '@/components/ProfileAppBar';
import ProfileContent from '@/components/ProfileContent';

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
    // Temporarily as a reactive var
    const userProfileInfo = useReactiveVar(userInfo);

    console.debug(userkey);

    let appBarTitle = '';
    let profileContent = null;

    // This would be queried and based on query return using
    // userkey to reference the data.  Use this temporarily
    // in place of the data retrieval.
    if ( userkey ) {
        appBarTitle = userProfileInfo.name;

        // The user was retrieved, we can display the
        // profile information.
        profileContent = (
            <ProfileContent
                name={userProfileInfo.name}
                tagline={userProfileInfo.tagline}
                skills={userProfileInfo.skills}
            />
        );
    } else {
        // Empty State for profile content if the profile can
        // not be looked up.
        // Should provide a status and suggestion to resolve.
        profileContent = (
            <CardContent>
                <Typography variant="body1" >
                    { "Sorry, we don't recognize what you are looking for." }
                </Typography>
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