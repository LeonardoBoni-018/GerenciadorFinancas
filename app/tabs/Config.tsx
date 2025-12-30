import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { getUser, setUser } from "@/src/services/user";
import { useRouter } from "expo-router";

export default function Config() {
  const [darkMode, setDarkMode] = React.useState(false);
  const router = useRouter();
  const configItems = [
    { icon: "lock-closed-outline", label: "Segurança", value: "Ativo" },
    { icon: "notifications-outline", label: "Notificações", value: "Ativo" },
    {
      icon: "moon-outline",
      label: "Modo Escuro",
      value: darkMode ? "Ativo" : "Desligado",
    },
    { icon: "document-text-outline", label: "Privacidade", value: "" },
    { icon: "help-circle-outline", label: "Ajuda", value: "" },
    { icon: "information-circle-outline", label: "Sobre", value: "" },
  ];

  function toggleDarkMode(value: boolean) {
    setDarkMode(value);
  }

  const user = getUser();
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  React.useEffect(() => {
    if (user) {
      setUserData({
        name: user.nome || user.name || "",
        email: user.email || "",
        phone: user.telefone || user.phone || "",
        city: user.cidade || user.city || "",
      });
    }
  }, [user]);
  function logout() {
    setUser(null);
    setUserData({ name: "", email: "", phone: "", city: "" });
    router.replace("/auth");
  }

  return (
    <LinearGradient colors={["#f0f7ff", "#ffffff"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>
        </View>

        {configItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.configItem}
            activeOpacity={0.8}
          >
            <View style={styles.configLeft}>
              <View style={styles.iconBox}>
                <Ionicons name={item.icon as any} size={24} color="#1E90FF" />
              </View>
              <Text style={styles.configLabel}>{item.label}</Text>
            </View>
            <View style={styles.configRight}>
              {item.label === "Modo Escuro" ? (
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  thumbColor={darkMode ? "#FFF" : "#FFF"}
                  trackColor={{ false: "#CFCFCF", true: "#1E90FF" }}
                />
              ) : (
                <>
                  {item.value !== "" && (
                    <Text style={styles.configValue}>{item.value}</Text>
                  )}
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="#CCC"
                  />
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
  },
  configItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  configLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  configLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  configRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  configValue: {
    fontSize: 14,
    color: "#1E90FF",
    fontWeight: "500",
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    backgroundColor: "#FFEBEE",
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "bold",
  },
});
