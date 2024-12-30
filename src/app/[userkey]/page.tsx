
import { headers } from 'next/headers';

import Profile from '@/components/Profile';
import ApolloClientContainer from '@/components/ApolloClientContainer';

/**
 * A page to display the profile information for an individual.
 */
export default async function ProfilePage({
    params,
} : {
    params: Promise<{userkey:string}>
}) {
    const userkey = (await params).userkey;

    // Validate the user key to make sure we don't have a bad request.
    // There's really only one valid user key in this demo, so we'll just cut out
    // any invalid requests ahead of time.
    const validUserKeys = process.env.VALID_USER_TAGS?.split(',') ?? [];

    const csrfToken = headers().get('X-CSRF-Token') ?? 'invalid';

    return (
        <ApolloClientContainer csrfToken={csrfToken} >
            {
                ( validUserKeys.includes( userkey.toLowerCase() ) ) ? (
                    <Profile userkey={userkey.toLowerCase()} />
                ) : (
                    <Profile hint={validUserKeys?.[0]} />
                )
            }
        </ApolloClientContainer>
    );
}