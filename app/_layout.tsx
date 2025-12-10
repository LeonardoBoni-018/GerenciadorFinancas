import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth/index" />
      <Stack.Screen name="auth/Cadastro" />
      <Stack.Screen name="tabs" />
    </Stack>
  );
}
