import Profile from '@/components/Profile';
import ApolloClientContainer from '@/components/ApolloClientContainer';

export default async function ProfilePage({
    params,
} : {
    params: Promise<{userkey:string}>
}) {
    const userkey = (await params).userkey;
    console.log(userkey);

    return (
        <ApolloClientContainer>
            <Profile />
        </ApolloClientContainer>
    );
}