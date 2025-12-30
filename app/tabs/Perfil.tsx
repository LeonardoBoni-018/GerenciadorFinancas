"use client";

import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { getUser, setUser } from "@/src/services/user";
import { updateProfile } from "@/src/services/auth";

export default function Perfil() {
  const user = getUser();
  const [openModal, setOpenModal] = React.useState(false);
  const formatedJoinDate = new Date(user.criadoEm).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
  });
  const [userData, setUserData] = React.useState({
    id: user.id,
    name: user.nome,
    email: user.email,
    phone: user.telefone,
    city: user.cidade,
    joinDate: `Membro desde ${formatedJoinDate}`,
  });

  const [editData, setEditData] = React.useState({ ...userData });
  console.log('user:', user);

  const handleSave = async () => {
    // validate presence of id
    if (!user || !user.id) {
      Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const res = await updateProfile(
        user.id,
        editData.name,
        editData.email,
        editData.phone,
        editData.city
      );

      const updatedUser = res?.data?.user;
      if (updatedUser) {
        // update global user store and local state
        setUser(updatedUser);
        setUserData({
          id: updatedUser.id,
          name: updatedUser.nome,
          email: updatedUser.email,
          phone: updatedUser.telefone,
          city: updatedUser.cidade,
          joinDate: `Membro desde ${new Date(updatedUser.criadoEm).toLocaleDateString("pt-BR", { year: "numeric", month: "long" })}`,
        });
      }

      setOpenModal(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      const e = err as any;
      const msg = e?.response?.data?.message || e?.message || "Erro ao atualizar perfil";
      Alert.alert("Erro", String(msg));
    }
  };

  const handleCancel = () => {
    setEditData({ ...userData });
    setOpenModal(false);
  };

  const stats = [
    { label: "Transações", value: "124" },
    { label: "Economizado", value: "R$ 2.350" },
    { label: "Meta Mensal", value: "R$ 3.000" },
  ];

  return (
    <LinearGradient colors={["#f0f7ff", "#ffffff"]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back-outline" size={24} color="#1E90FF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Meu Perfil</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setOpenModal(true)}
          >
            <Ionicons name="pencil-outline" size={24} color="#1E90FF" />
          </TouchableOpacity>
        </View>

        <Modal
          visible={openModal}
          animationType="slide"
          transparent={true}
          onRequestClose={handleCancel}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Perfil</Text>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.closeButton}
                >
                  <Ionicons name="close-outline" size={28} color="#666" />
                </TouchableOpacity>
              </View>

              <ScrollView
                style={styles.modalScroll}
                showsVerticalScrollIndicator={false}
              >
                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nome</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color="#1E90FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      value={editData.name}
                      onChangeText={(text) =>
                        setEditData({ ...editData, name: text })
                      }
                      placeholder="Digite seu nome"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#1E90FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      value={editData.email}
                      onChangeText={(text) =>
                        setEditData({ ...editData, email: text })
                      }
                      placeholder="Digite seu email"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Phone Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Telefone</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="call-outline"
                      size={20}
                      color="#1E90FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      value={editData.phone}
                      onChangeText={(text) =>
                        setEditData({ ...editData, phone: text })
                      }
                      placeholder="Digite seu telefone"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>

                {/* City Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Localização</Text>
                  <View style={styles.inputContainer}>
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color="#1E90FF"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      value={editData.city}
                      onChangeText={(text) =>
                        setEditData({ ...editData, city: text })
                      }
                      placeholder="Digite sua cidade"
                      placeholderTextColor="#999"
                    />
                  </View>
                </View>
              </ScrollView>

              {/* Action Buttons */}
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../assets/images/icon.png")}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Ionicons name="camera-outline" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileEmail}>{userData.email}</Text>
          <Text style={styles.joinDate}>{userData.joinDate}</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações Pessoais</Text>

          <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={20} color="#1E90FF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{userData.phone}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#1E90FF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Localização</Text>
              <Text style={styles.infoValue}>{userData.city}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={20} color="#1E90FF" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userData.email}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="download-outline" size={20} color="#1E90FF" />
            <Text style={styles.actionButtonText}>Baixar Extrato</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-social-outline" size={20} color="#1E90FF" />
            <Text style={styles.actionButtonText}>Compartilhar</Text>
          </TouchableOpacity>
        </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1E90FF",
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 12,
    color: "#999",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  infoSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    gap: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
  },
  actionButtonText: {
    color: "#1E90FF",
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111",
  },
  closeButton: {
    padding: 4,
  },
  modalScroll: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3F2FD",
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#1E90FF",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
