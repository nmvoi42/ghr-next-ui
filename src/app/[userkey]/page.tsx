
import { headers } from 'next/headers';

import Profile from '@/components/Profile';
import ApolloClientContainer from '@/components/ApolloClientContainer';

const VALID_USER_KEYS: string[] = process.env.VALID_USER_TAGS?.split(',') ?? [];

// Statically export some expected routes for improved performance.
export async function generateStaticParams() {
    return VALID_USER_KEYS.map( (validUserKey) => ({
        userkey: validUserKey,
    }) );
}

type ProfilePageProps = {
    readonly params: Promise<{userkey:string}>;
};

/**
 * A page to display the profile information for an individual.
 */
const ProfilePage: React.FC<ProfilePageProps> = async ({ params }) => {
    const userkey = (await params).userkey;

    const csrfToken = headers().get('X-CSRF-Token') ?? 'invalid';

    // Validate the user key to make sure we don't have a bad request.
    // There's really only one valid user key in this demo, so we'll just cut out
    // any invalid requests ahead of time.
    return (
        <ApolloClientContainer csrfToken={csrfToken} >
            {
                ( VALID_USER_KEYS.includes( userkey.toLowerCase() ) ) ? (
                    <Profile userkey={userkey.toLowerCase()} />
                ) : (
                    <Profile hint={VALID_USER_KEYS[0]} />
                )
            }
        </ApolloClientContainer>
    );
};

export default ProfilePage;