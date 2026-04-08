import AsyncStorage from "@react-native-async-storage/async-storage"

const FARM_KEY = "agriguard_farm"
const STREAK_KEY = "agriguard_streak"
const COMPLETIONS_KEY = "agriguard_completions"
const BASE_URL_KEY = "agriguard_base_url"

export async function saveFarm(farm: object) {
  await AsyncStorage.setItem(FARM_KEY, JSON.stringify(farm))
}

export async function loadFarm<T>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(FARM_KEY)
  return raw ? JSON.parse(raw) : null
}

export async function saveStreak(streak: object) {
  await AsyncStorage.setItem(STREAK_KEY, JSON.stringify(streak))
}

export async function loadStreak<T>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(STREAK_KEY)
  return raw ? JSON.parse(raw) : null
}

export async function saveCompletions(completions: string[]) {
  await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions))
}

export async function loadCompletions(): Promise<string[]> {
  const raw = await AsyncStorage.getItem(COMPLETIONS_KEY)
  return raw ? JSON.parse(raw) : []
}

export async function saveBaseUrl(url: string) {
  await AsyncStorage.setItem(BASE_URL_KEY, url)
}

export async function loadBaseUrl(): Promise<string> {
  return (await AsyncStorage.getItem(BASE_URL_KEY)) ?? ""
}
