import { useEffect } from "react"
import { Stack, useRouter } from "expo-router"
import { useAuth } from "@/context/auth"

export default function AuthLayout() {
  const { session, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && session) {
      router.replace("/(tabs)")
    }
  }, [session, loading])

  if (loading) return null

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  )
}
