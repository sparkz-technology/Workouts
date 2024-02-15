import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import AuthContextProvider from '../providers/AuthContext';

const RootLayout = () => {

    const queryClient = new QueryClient();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthContextProvider>
                <QueryClientProvider client={queryClient}>
                    <Stack>
                        <Stack.Screen name='index' options={{ title: "Exercises" }} />
                    </Stack>
                </QueryClientProvider>
            </AuthContextProvider>
        </GestureHandlerRootView>
    )
}

export default RootLayout;