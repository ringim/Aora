import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, Stack} from 'expo-router';
import {useFonts} from 'expo-font';
import { useEffect } from 'react';

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
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: true}} />
    </Stack>
)
}

export default RootLayout
