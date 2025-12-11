"use client"

import { useRouter } from "expo-router"
import { useEffect } from "react"
import { View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

export default function Index() {
  const router = useRouter()

  useEffect(() => {
    // Aqui você pode adicionar lógica para verificar se o usuário está autenticado
    // Por enquanto, redireciona para a tela de login
    router.replace("/auth")
  }, [])

  return (
    <LinearGradient colors={["#d9e9ff", "#ffffff"]} style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
    </LinearGradient>
  )
}
