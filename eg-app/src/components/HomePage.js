import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Button,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";

const HomePage = ({ navigation }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  async function getProducts() {
    axios
      .get("http://192.168.68.111:8000/api/products", { crossdomain: true })
      .then((res) => {
        let data = res.data;
        data.forEach(function (element, index) {
          Object.assign(element, { key: index });
        });
        dispatch({
          type: "REFRESH_PRODUCT_LIST",
          payload: {
            products: data,
          },
        });
      });
  }
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View>
          <TouchableHighlight onPress={() => navigation.navigate("ScanForm")}>
            <View style={styles.btn}>
              <Text>Update Stock</Text>
            </View>
          </TouchableHighlight>
          <Image
            style={styles.logo}
            source={{
              uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-inventory-factory-flaticons-flat-flat-icons.png",
            }}
          />
        </View>
        <View style={styles.item}>
          <TouchableHighlight>
            <View style={styles.btn}>
              <Text>View Receipts</Text>
            </View>
          </TouchableHighlight>
          <Image
            style={styles.logo}
            source={{
              uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-inventory-factory-flaticons-flat-flat-icons-2.png",
            }}
          />
        </View>
      </View>

      <View style={styles.item}></View>
      <Button title="back" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
};
const width_proportion = "80%";
const height_proportion = "40%";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    marginLeft: 15,
    paddingLeft:5,
    paddingRight:5,
    width: 115,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#151D3B",
  },

  box: {
    width: width_proportion,
    height: height_proportion,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
export default HomePage;
