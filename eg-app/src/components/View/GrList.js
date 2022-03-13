import React, { useState, useEffect } from "react";
import moment from 'moment'

import axios from "axios";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Text,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const Item = ({ id, date,navigation }) => (
  <TouchableOpacity onPress={()=>handleOntouch(navigation,id)} style={styles.item}>
    <Text style={styles.itemText}>GR ID: {id}</Text>
    <Text style={styles.itemText}>Created Date: {moment(date).format("dddd, MMM DD at HH:mm a")}</Text>
  </TouchableOpacity>
);

const handleOntouch = (navigation,id) =>{
    navigation.navigate("GrDetails", {
        productId: id,
      });
}

const GrList = ({ route, navigation }) => {
  const { grs } = useSelector((state) => state.grs);

  useEffect(() => {
    if (grs.length > 0) {
    }
  }, [grs]);

  const renderItem = ({ item }) => {
    return <Item id={item._id} date={item.createdAt} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.flatContainer}>
        <FlatList
          data={grs[0].grs}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        <View style={styles.btnBox}></View>
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
export default GrList;
