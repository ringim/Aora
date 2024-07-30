import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import GlobalProvider from '../context/GlobalProvider';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
const [fontsLoaded, error] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-ExtraBold' : require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-Black' : require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-ExtraLight' : require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),

});

useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) SplashScreen.hideAsync();
}, [fontsLoaded, error])

if (!fontsLoaded && !error) {
    return null;
} 

return (
    <GlobalProvider>

    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="(auth)" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
        {/* <Stack.Screen name="(/search/[query]" options={{ headerShown: false}} /> */}
    </Stack>

    </GlobalProvider>
    

    
)
}

export default RootLayout
