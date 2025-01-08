import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="rules" options={{ title: 'Rules' }} />
      <Stack.Screen name="game" options={{ title: 'Game Room', gestureEnabled: false, headerShown: false, }} />
      <Stack.Screen name="waiting" options={{ title: 'Waiting Room', gestureEnabled: false, headerShown: false, }} />
    </Stack>
  );
}
