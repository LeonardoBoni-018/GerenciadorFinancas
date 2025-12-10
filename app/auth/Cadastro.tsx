import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { cadastrar } from "@/src/services/auth";

export default function Cadastrar() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleCadastro() {
    try {
      await cadastrar(nome, email, senha);
      Alert.alert("Cadastro realizado!");
      router.replace("/tabs/Home");
    } catch (error) {
      Alert.alert("Erro ao cadastrar.");
    }
  }

  return (
    <LinearGradient colors={["#d9e9ff", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <FontAwesome5 name="wallet" size={80} color="#1E90FF" />
        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={22} color="#666" />
          <TextInput
            style={styles.inputText}
            placeholder="Nome"
            onChangeText={setNome}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={22} color="#666" />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="#666" />
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            secureTextEntry
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity onPress={handleCadastro} style={styles.loginButton}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>Já tem login?</Text>
          <Link href="/auth" style={styles.inlineLink}>
            Entrar
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 40, marginBottom: 20, color: "#1E90FF" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    width: "80%",
    marginVertical: 8,
  },
  inputText: { flex: 1 },
  loginButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18 },
  inlineLink: { color: "#1E90FF", marginLeft: 4 },
  registerContainer: { flexDirection: "row", marginTop: 20 },
});
