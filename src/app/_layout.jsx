import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthContextProvider from '../providers/AuthContext';

const RootLayout = () => {

    const queryClient = new QueryClient();

    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Stack>
                    <Stack.Screen name='index' options={{ title: "Exercises" }} />
                </Stack>
            </QueryClientProvider>
        </AuthContextProvider>
    )
}

export default RootLayout;