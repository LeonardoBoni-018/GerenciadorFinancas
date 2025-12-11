import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: "expense" | "income";
  icon: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "Supermercado",
    amount: 152.5,
    category: "Alimentação",
    date: "Hoje",
    type: "expense",
    icon: "cart-outline",
  },
  {
    id: "2",
    description: "Salário",
    amount: 3500.0,
    category: "Renda",
    date: "Ontem",
    type: "income",
    icon: "briefcase-outline",
  },
  {
    id: "3",
    description: "Conta de Luz",
    amount: 250.0,
    category: "Utilidades",
    date: "2 dias atrás",
    type: "expense",
    icon: "bulb-outline",
  },
  {
    id: "4",
    description: "Restaurante",
    amount: 89.9,
    category: "Alimentação",
    date: "3 dias atrás",
    type: "expense",
    icon: "restaurant-outline",
  },
];

const categoryData = [
  { category: "Alimentação", amount: 242.4, color: "#FF6B6B" },
  { category: "Transporte", amount: 120.0, color: "#4ECDC4" },
  { category: "Utilidades", amount: 250.0, color: "#FFE66D" },
  { category: "Lazer", amount: 180.0, color: "#95E1D3" },
];

export default function Home() {
  const totalBalance = 5420.5;
  const monthlySpending = 882.4;
  const monthlyIncome = 3500.0;

  const chartData = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
    datasets: [
      {
        data: [120, 150, 100, 180, 95, 140, 110],
      },
    ],
  };

  return (
    <LinearGradient colors={["#f0f7ff", "#ffffff"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.profileImg}
            />
            <View>
              <Text style={styles.greeting}>Bem-vindo,</Text>
              <Text style={styles.userName}>Leonardo!</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={28} color="#1E90FF" />
          </TouchableOpacity>
        </View>

        {/* Saldo Total Card */}
        <LinearGradient
          colors={["#1E90FF", "#0066FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <View style={styles.balanceContent}>
            <Text style={styles.balanceLabel}>Saldo Total</Text>
            <Text style={styles.balanceAmount}>
              R$ {totalBalance.toFixed(2)}
            </Text>
          </View>
          <View style={styles.balanceIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-down-outline" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-up-outline" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Resumo Mensal */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#E3F2FD" }]}>
              <Ionicons name="arrow-down-outline" size={24} color="#1E90FF" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Receita</Text>
              <Text style={styles.summaryAmount}>
                R$ {monthlyIncome.toFixed(2)}
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: "#FFEBEE" }]}>
              <Ionicons name="arrow-up-outline" size={24} color="#FF6B6B" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Despesa</Text>
              <Text style={styles.summaryAmount}>
                R$ {monthlySpending.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Gráfico de Gastos */}
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Gastos da Semana</Text>
          <View style={styles.chartContainer}>
            <BarChart
              data={chartData}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: () => "#1E90FF",
                barPercentage: 0.6,
              }}
              style={styles.chart}
            />
          </View>
        </View>

        {/* Categorias de Gastos */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Gastos por Categoria</Text>
          {categoryData.map((cat, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.categoryLeft}>
                <View
                  style={[styles.categoryDot, { backgroundColor: cat.color }]}
                />
                <Text style={styles.categoryName}>{cat.category}</Text>
              </View>
              <Text style={styles.categoryAmount}>
                R$ {cat.amount.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Transações Recentes */}
        <View style={styles.transactionsSection}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.sectionTitle}>Transações Recentes</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>Ver Tudo</Text>
            </TouchableOpacity>
          </View>

          {mockTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionItem}
            >
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    {
                      backgroundColor:
                        transaction.type === "expense" ? "#FFEBEE" : "#E3F2FD",
                    },
                  ]}
                >
                  <Ionicons
                    name={transaction.icon}
                    size={20}
                    color={
                      transaction.type === "expense" ? "#FF6B6B" : "#1E90FF"
                    }
                  />
                </View>
                <View>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionCategory}>
                    {transaction.category} • {transaction.date}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color:
                      transaction.type === "expense" ? "#FF6B6B" : "#1E90FF",
                  },
                ]}
              >
                {transaction.type === "expense" ? "-" : "+"}R${" "}
                {transaction.amount.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão de Adicionar Transação */}
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={60} color="#1E90FF" />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  balanceCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  balanceContent: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  balanceIcons: {
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  summarySection: {
    flexDirection: "row",
    gap: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  summaryCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
  },
  chartSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 16,
  },
  chartContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  chart: {
    borderRadius: 12,
  },
  categoriesSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
  },
  transactionsSection: {
    paddingHorizontal: 20,
    marginBottom: 100,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllLink: {
    color: "#1E90FF",
    fontSize: 14,
    fontWeight: "500",
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
    marginBottom: 4,
  },
  transactionCategory: {
    fontSize: 12,
    color: "#999",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
