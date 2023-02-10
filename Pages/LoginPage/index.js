import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Link } from "@react-navigation/native";
import Modal from "react-native-modal";
import axios from "axios";

import AppContext from "../../Context/Context";

export default function LoginPage({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);

  const { setToken } = useContext(AppContext);

  async function handleSubmit(e) {
    try {
      e.preventDefault(e);
      const res = await axios.post("http://192.168.15.8:5000/login", {
        email,
        password,
      });
      setToken(res.data.token);
      navigation.navigate("HomeScreen");
    } catch (err) {
      setModal(true);
    }
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
        keyboardType="email-address"
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Senha"
        onChangeText={setPassword}
        value={password}
      />
      <Modal
        isVisible={modal}
        animationIn="flipInX"
        animationInTiming={520}
        animationOut="flipOutY"
        animationOutTiming={520}
      >
        <View style={styles.modal}>
          <Text>Email e/ou senha incorretos</Text>
          <View style={styles.modalButton}>
            <Button color="black" onPress={() => setModal(false)} title="X" />
          </View>
        </View>
      </Modal>
      <View
        style={{ width: 300, marginTop: 10, marginBottom: 10, borderRadius: 5 }}
      >
        <Button color="#A328D6" title="Entrar" onPress={handleSubmit} />
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
  modal: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 50,
    borderWidth: 5,
    color: "white",
    backgroundColor: "white",
    marginLeft: 50,
  },
});
