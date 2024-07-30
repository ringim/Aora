import { Client, Account, Databases, Avatars, Query } from 'react-native-appwrite';
import { ID } from 'react-native-appwrite';

export const appwriteconfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.aroa',
    projectId: '66a8efc900022c86fd03',
    databaseId: '66a8f3b20005fab63596',
    userCollectionId: '66a8f3e800271fc0f55c',
    videoCollectionId: '66a8f3fe00288a49dd04',
    storageId: '66a8f54d003c39cc7b0d'
};

// Initialize your React Native SDK
const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Set the configuration for the client
client
    .setEndpoint(appwriteconfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteconfig.projectId) // Your project ID
    .setPlatform(appwriteconfig.platform); // Your application ID or bundle ID

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password); // Call the signIn function instead of the SignIn component

        // Create a New Instance of a user in Database
        const newUser = await databases.createDocument(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            ID.unique(), {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () =>{
    try {
        const currentAccount  = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteconfig.databaseId,
            appwriteconfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;
        return currentUser.documents[0];
        
    } catch (error) {
        console.log(error)
    }
}