import Profile from '@/components/Profile';
import ApolloClientContainer from '@/components/ApolloClientContainer';

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

    if ( validUserKeys.includes( userkey.toLowerCase() ) ) {
        return (
            <ApolloClientContainer>
                <Profile userkey={userkey.toLowerCase()} />
            </ApolloClientContainer>
        );
    } else {
        return (
            <ApolloClientContainer>
                <Profile hint={validUserKeys?.[0]} />
            </ApolloClientContainer>
        );
    }
}