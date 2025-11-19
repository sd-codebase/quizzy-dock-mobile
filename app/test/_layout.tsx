import { Stack } from 'expo-router';

export default function TestLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="mcq/[subtopicId]" />
      <Stack.Screen name="interview/[subtopicId]" />
      <Stack.Screen name="output/[subtopicId]" />
    </Stack>
  );
}
