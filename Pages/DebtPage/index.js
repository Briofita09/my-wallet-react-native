import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import axios from "axios";

import AppContext from "../../Context/Context";

export default function DebtPage({ navigation }) {
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState();

  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const today = new Date().toLocaleDateString();
  let transaction = {
    value,
    description,
    type: "debt",
    date: today,
  };
  async function handleSubmit(e) {
    try {
      e.preventDefault(e);
      const res = await axios.post(
        "http://192.168.15.8:5000/transactions",
        transaction,
        config
      );
      console.warn(res);
      navigation.navigate("HomeScreen");
    } catch (err) {
      console.warn(err);
    }
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ color: "white", marginTop: 50 }}>
          Insira aqui seu gasto!{" "}
        </Text>
        <View>
          <Button title="<-" />
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={value}
        onChangeText={setValue}
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        keyboardType="default"
      />
      <View>
        <Button title="Enviar" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C11BE",
    alignItems: "center",
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
