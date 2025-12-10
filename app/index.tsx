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
import { login } from "@/src/services/auth";

const index = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [senha, setSenha] = useState("");
  async function handleLogin() {
    try {
      await login(name, senha);
      Alert.alert("Cadastro realizado com sucesso!");
      router.push("/Home");
    } catch (error) {
      Alert.alert("Erro ao cadastrar. Tente novamente.");
      setName("");
      setSenha("");
    }
  }
  return (
    <LinearGradient colors={["#d9e9ff", "#ffffff"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <FontAwesome5 name="wallet" size={80} color="#1E90FF" />

        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={22}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color="#666"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputText}
            placeholder="Senha"
            secureTextEntry
            onChangeText={setSenha}
          />
        </View>

        <Link href="/" style={styles.link}>
          Esqueceu sua senha?
        </Link>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text>Não tem cadastro?</Text>
          <Link href="/Cadastro" style={styles.inlineLink}>
            Cadastre-se
          </Link>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1E90FF",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    width: "100%",
    maxWidth: 260,
    marginVertical: 8,
    borderColor: "#1E90FF",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  icon: {
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontSize: 14,
    color: "#1E90FF",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  inlineLink: {
    fontSize: 14,
    color: "#1E90FF",
    textDecorationLine: "underline",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

export default index;
