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
import { useDispatch, useSelector } from "react-redux";

const CreateGrForm = ({ route, navigation }) => {
  const { gr_lines } = useSelector((state) => state.gr_lines);
  const [tempLines, setTempLines] = useState([]);
  const { productId } = route.params;
  const { productCode } = route.params;
  const { productName } = route.params;
  const { productUom } = route.params;

  const [qty, setQty] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    if (gr_lines.length > 0) {  
      setTempLines(gr_lines[0].gr_lines);
    }
  }, []);

  const handleNavigation = (destination) => {
    if (!qty) {
      alert("Missing Qty!");
      return;
    }
    let lines = []
    if(tempLines.length>0){
      lines = JSON.parse(JSON.stringify(tempLines))
    }
    if (lines.length>0 && lines.some((e) => e.product_id == productId)) {
      let foundIndex = lines.findIndex((x) => x.product_id == productId);
      lines[foundIndex].qty = parseInt(lines[foundIndex].qty) + parseInt(qty);
    }
    else{
      lines.push({
        product_id: productId,
        product_name: productName,
        product_code: productCode,
        uom:productUom,
        qty: qty,
      });
    } 
    dispatch({
      type: "STOCK_CARD",
      payload: {
        gr_lines: lines,
      },
    });
    if (destination === "addMore") {
      navigation.goBack();
    } else {
      navigation.navigate("GrSummary")
    }
  };

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
        <View style={styles.btnBox}>
          <TouchableHighlight onPress={()=>handleNavigation("addMore")}>
            <View style={styles.loginBtn}>
              <Text>Add More</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={()=>handleNavigation("")}>
            <View style={styles.loginBtn}>
              <Text>Done</Text>
            </View>
          </TouchableHighlight>
        </View>
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

  btnBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
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
    margin: 10,
  },
});
export default CreateGrForm;
