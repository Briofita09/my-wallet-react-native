import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, TextInput, View, Alert } from "react-native";
import { Link } from "@react-navigation/native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit() {
    Alert.alert("clicado");
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 70, marginBottom: 20 }}>
        My Wallet
      </Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
      />
      <View
        style={{ width: 300, marginTop: 10, marginBottom: 10, borderRadius: 5 }}
      >
        <Button color="#A328D6" title="Entrar" />
      </View>
      <Link
        to={{ screen: "SignUpPage" }}
        style={{ color: "#fff", fontSize: 20, marginTop: 10 }}
      >
        Primeira vez? Cadastre-se!
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C11BE",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    marginTop: 5,
    margin: 5,
    width: 300,
    height: 50,
    borderRadius: 5,
  },
});
