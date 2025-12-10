import { Image } from "expo-image";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftSide}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.profileImg}
          />

          <View>
            <Text style={styles.goodMorning}>Bom dia</Text>
            <Text style={styles.userName}>Leonardo!</Text>
          </View>
        </View>

        <Ionicons name="notifications-outline" size={28} color="#333" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  goodMorning: {
    fontSize: 16,
    color: "#444",
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
});
