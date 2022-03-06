import React, { useState, useEffect, useRef } from "react";

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

const CreateGrForm = ({ route, navigation }) => {
  const { productId } = route.params;
  const { productCode } = route.params;
  const { productName } = route.params;
  const [qty, setQty] = useState("");

  useEffect(() => {}, []);

  const handleDone = () => {
    if (!qty) {
      alert("Missing Qty!");
      return;
    }
    console.log(qty);
    alert(qty);
  };

  async function createGr() {}

  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.box}>
        <Text style={styles.titleText}>Product Name</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={productName}
            editable={false}
            multiline={true}
            placeholderTextColor="#003f5c"
          />
        </View>
        <Text style={styles.titleText}>Product Code</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            value={productCode}
            editable={false}
            multiline={true}
            placeholderTextColor="#003f5c"
          />
        </View>
        <Text style={styles.titleText}>Stock Quantity</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            placeholder="Enter Qty"
            autoFocus={true}
            onChangeText={(text) => setQty(text)}
            placeholderTextColor="#003f5c"
          />
        </View>
        <TouchableHighlight onPress={handleDone}>
          <View style={styles.loginBtn}>
            <Text>Done</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const width_proportion = "80%";
const height_proportion = "60%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: width_proportion,
    height: height_proportion,
    alignItems: "center",
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    paddingTop: 10,
  },

  titleText: {
    marginBottom: 5,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffff",
    borderColor: "#D82148",
    borderWidth: 2,
    borderRadius: 25,
    height: 40,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  loginBtn: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#151D3B",
  },
});
export default CreateGrForm;
