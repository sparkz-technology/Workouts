import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen name='index' options={{ title: "Exercises" }} />
            </Stack>
        </QueryClientProvider>
    )
}

export default RootLayout;