import { useEffect } from "react"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as SplashScreen from "expo-splash-screen"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AuthProvider } from "@/context/auth"
import { loadBaseUrl, setBaseUrl } from "@/lib/api"

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    async function prepare() {
      const url = await loadBaseUrl()
      if (url) setBaseUrl(url)
      await SplashScreen.hideAsync()
    }
    prepare()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
