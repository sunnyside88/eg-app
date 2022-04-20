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
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Item = ({ qty, name, code, uom }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>Product Name: {name}</Text>
    <Text style={styles.itemText}>Code: {code}</Text>
    <Text style={styles.itemText}>
      Qty: {qty} {uom}
    </Text>
  </View>
);

const showAlert = ({ navigation, dispatch }) =>
  Alert.alert("Cancel", "Abandon transation?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Confirm",
      onPress: () => {
        dispatch({
          type: "STOCK_CARD",
          payload: {
            gr_lines: [],
          },
        });
        navigation.navigate("Home");
      },
    },
  ]);

const GrSummary = ({ route, navigation }) => {
  const { gr_lines } = useSelector((state) => state.gr_lines);
  const [userToken, setUserToken] = useState("");
  const { user } = useSelector((state) => state.user);

  let dispatch = useDispatch();

  useEffect(() => {
    if (gr_lines.length > 0) {
    }
    if (user) {
      setUserToken(user.token);
    }
  }, [gr_lines, user]);

  const renderItem = ({ item }) => {
    return (
      <Item
        name={item.product_name}
        code={item.product_code}
        qty={item.qty}
        uom={item.uom}
      />
    );
  };

  const createGr = async () => {
    let data = {
      from_location: "Supplier",
      to_location: "Main Warehouse",
      stock_pick_lines: gr_lines[0].gr_lines,
      status: "Approved",
      createdBy: user[0].user,
    };
    await updateProductStockCount();
    let res = await axios.post(
      "http://fast-shore-47363.herokuapp.com/api/gr/insertOne",
      { data: data },
      { headers: { userToken: `${userToken}` } }
    );
    return res.data._id;
  };

  const updateProductStockCount = async () => {
    gr_lines[0].gr_lines.map(async (x) => {
      let res = await axios.get(
        `http://fast-shore-47363.herokuapp.com/api/products/${x.product_id}`,
        { headers: { userToken: `${userToken}` } }
      );
      let newStockUpdate = {
        stock_qty: parseInt(res.data.stock_qty) + parseInt(x.qty),
      };
      let updateRes = await axios.post(
        `http://fast-shore-47363.herokuapp.com/api/products/update/${x.product_id}`,
        { data: newStockUpdate },
        { headers: { userToken: `${userToken}` } }
      );
    });
  };

  const handleDone = async () => {
    let pick_id = await createGr();
    if (pick_id) {
      alert("GR created successfully!");
      dispatch({
        type: "STOCK_CARD",
        payload: {
          gr_lines: [],
        },
      });
      navigation.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Summary</Text>
      <SafeAreaView style={styles.flatContainer}>
        <FlatList
          data={gr_lines[0].gr_lines}
          renderItem={renderItem}
          keyExtractor={(item) => item.product_id}
        />
        <View style={styles.btnBox}>
          <TouchableHighlight
            onPress={() => showAlert({ navigation, dispatch })}
          >
            <View style={styles.loginBtn}>
              <Text>Cancel</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => handleDone()}>
            <View style={styles.loginBtn}>
              <Text>Done</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </View>
  );
};

const width_proportion = "80%";
const height_proportion = "90%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 10,
    alignItems: "center",
    //justifyContent: "center",
  },

  flatContainer: {
    flex: 1,
    marginTop: 10,
  },

  item: {
    backgroundColor: "#ffff",
    padding: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    marginBottom: 10,
    //marginVertical: 8,
    //marginHorizontal: 16,
  },

  headerText: {
    fontSize: 20,
  },
  itemText: {
    fontSize: 12,
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
    //alignItems: "center",
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
export default GrSummary;
