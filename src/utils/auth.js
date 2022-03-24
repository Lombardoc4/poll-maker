import { Auth } from 'aws-amplify';

export async function signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}


export async function signUp(username, password, name) {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                name,
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}