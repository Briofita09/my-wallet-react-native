import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";

import axios from "axios";

import AppContext from "../../Context/Context";

export default function HomeScreen() {
  const [transactions, setTransactions] = useState();
  const [total, setTotal] = useState(0);

  const { token } = useContext(AppContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Olá! Aqui estão suas transações </Text>
      <View style={styles.transactionsView}>
        {transactions &&
          transactions.map((transaction) => {
            return (
              <View style={styles.transactionView}>
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <View style={{ width: 100, marginRight: 50 }}>
          <Button title="Adicionar crédito" />
        </View>
        <View style={{ width: 100 }}>
          <Button title="Adicionar débito" color="red" />
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
    justifyContent: "center",
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
