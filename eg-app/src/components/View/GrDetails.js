import React, { useState, useEffect } from "react";
import moment from 'moment'

import axios from "axios";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Button,
  Text,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>Product Name: {item.product_name}</Text>
    <Text style={styles.itemText}>Code: {item.product_code}</Text>
    <Text style={styles.itemText}>Qty: {item.qty} {item.uom}</Text>

  </View>
);

const GrDetails = ({ route }) => {
  const { grs } = useSelector((state) => state.grs);
  const [stockLines, setStockLine] = useState([]);
  const [obj, setObj] = useState(null);
  const { productId } = route.params;

  useEffect(() => {
    if (grs.length > 0) {
      const gr = grs[0].grs.find((x) => x._id == productId);
      setStockLine(gr.stock_pick_lines);
      setObj(gr);
    }
  }, [grs]);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.box}>
        <Text style={styles.titleText}>ID</Text>
        {obj ? <Text>{obj._id}</Text> : null}

        <Text style={styles.titleText}>From</Text>
        {obj ? <Text>{obj.from_location}</Text> : null}

        <Text style={styles.titleText}>To</Text>
        {obj ? <Text>{obj.to_location}</Text> : null}

        <Text style={styles.titleText}>Created by</Text>
        {obj ? <Text>{obj.createdBy}</Text> : null}

        <Text style={styles.titleText}>Date</Text>
        {obj ? <Text>{moment(obj.createdAt).format("dddd, MMM DD at HH:mm a")}</Text> : null}

        <Text style={styles.titleText}>Items</Text>
        <FlatList
          data={stockLines}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={styles.btnBox}></View>
    </View>
  );
};

const width_proportion = "80%";
const height_proportion = "80%";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    backgroundColor: "#ffff",
    padding: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    margin:5
    //marginVertical: 8,
    //marginHorizontal: 16,
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
    alignItems: "center",
    backgroundColor: "#ffff",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 10,
    paddingTop: 10,
  },

  titleText: {
    marginTop: 20,
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
export default GrDetails;
