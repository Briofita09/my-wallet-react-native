import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Switch,
  Pressable,
} from "react-native";
import { Link, useIsFocused } from "@react-navigation/native";

import axios from "axios";

import AppContext from "../../Context/Context";

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState();
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState(0);
  const [description, setDescription] = useState();
  const [debt, setDebt] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const focus = useIsFocused();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://192.168.15.8:5000/transactions",
          config
        );
        setTransactions(res.data);
      } catch (err) {
        console.warn(err);
      }
    }
    async function fetchTotal() {
      try {
        const res = await axios.get("http://192.168.15.8:5000/total", config);
        setTotal(res.data);
      } catch (err) {
        console.warn(err);
      }
    }
    fetchData();
    fetchTotal();
  }, [focus, refresh]);

  const today = new Date().toLocaleDateString();
  let transaction = {
    value: Number(value),
    description,
    type: debt ? "debt" : "credit",
    date: today,
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault(e);
      await axios.post(
        "http://192.168.15.8:5000/transactions",
        transaction,
        config
      );
      setRefresh(!refresh);
      setValue(0);
      setDescription("");
      navigation.navigate("HomeScreen");
    } catch (err) {
      console.warn(err);
    }
  }

  async function deleteTransaction(t) {
    try {
      await axios.delete(`http://192.168.15.8:5000/transactions/${t}`, config);
      setRefresh(!refresh);
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Olá! Aqui estão suas transações </Text>
      <View style={styles.transactionsView}>
        {transactions &&
          transactions.map((transaction) => {
            return (
              <View style={styles.transactionView} key={transaction._id}>
                <Text style={{ color: "#c6c6c6" }}>{transaction.date}</Text>
                <Text style={styles.transactionText}>
                  {transaction.description}
                </Text>
                {transaction.type === "credit" ? (
                  <Text style={styles.transactionCredit}>
                    {transaction.value}
                  </Text>
                ) : (
                  <Text style={styles.transactionDebt}>
                    {transaction.value}
                  </Text>
                )}
                <Pressable onPress={() => deleteTransaction(transaction._id)}>
                  <Text
                    style={{
                      color: "#c6c6c6",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    X
                  </Text>
                </Pressable>
              </View>
            );
          })}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>Total:</Text>
          <Text>{total}</Text>
        </View>
      </View>
      <View>
        <Text style={{ color: "white" }}>Insira aqui sua entrada/saída</Text>
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
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white" }}>Crédito</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={debt ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={() => setDebt(!debt)}
              value={debt}
            />
            <Text style={{ color: "white" }}>Débito</Text>
          </View>
          <Button title="Enviar" onPress={handleSubmit} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8C11BE",
    alignItems: "center",
  },
  title: {
    marginTop: 50,
    color: "#fff",
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
  transactionsView: {
    flex: 1,
    backgroundColor: "#fff",
    maxHeight: 550,
    minWidth: 300,
    borderRadius: 5,
    marginTop: 20,
  },
  transactionText: {
    flex: 1,
    color: "black",
    zIndex: 2,
    marginLeft: 15,
  },
  transactionView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionCredit: {
    color: "blue",
  },
  transactionDebt: {
    color: "red",
  },
});
