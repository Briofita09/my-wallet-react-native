import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Link } from "@react-navigation/native";
import Modal from "react-native-modal";
import axios from "axios";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalCorrect, setModalCorrect] = useState(false);
  const [modalIncorrect, setModalIncorrect] = useState(false);

  async function handleSubmit(e) {
    try {
      e.preventDefault(e);
      const res = await axios.post("http://192.168.15.8:5000/sign-up", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (res.status === 201) {
        setModalCorrect(true);
      }
    } catch (err) {
      setModalIncorrect(true);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff", fontSize: 70, marginBottom: 20 }}>
        My Wallet
      </Text>

      <Modal
        isVisible={modalCorrect}
        animationIn="flipInX"
        animationInTiming={520}
        animationOut="flipOutY"
        animationOutTiming={520}
      >
        <View style={styles.modal}>
          <Text>Usuário cadastrado com sucesso</Text>
          <View style={styles.modalButton}>
            <Button
              color="black"
              onPress={() => setModalCorrect(false)}
              title="X"
            />
          </View>
        </View>
      </Modal>

      <Modal
        isVisible={modalIncorrect}
        animationIn="flipInX"
        animationInTiming={520}
        animationOut="flipOutY"
        animationOutTiming={520}
      >
        <View style={styles.modal}>
          <Text>Usuário já cadastrado</Text>
          <View style={styles.modalButton}>
            <Button
              color="black"
              onPress={() => setModalIncorrect(false)}
              title="X"
            />
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        onChangeText={setName}
        value={name}
      />
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
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Confirme a senha"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <View
        style={{ width: 300, marginTop: 10, marginBottom: 10, borderRadius: 5 }}
      >
        <Button color="#A328D6" title="Cadastrar" onPress={handleSubmit} />
      </View>
      <Link
        to={{ screen: "LoginPage" }}
        style={{ color: "#fff", fontSize: 20, marginTop: 10 }}
      >
        Já tem uma conta? Entre agora!
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
