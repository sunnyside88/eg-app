import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Button,
  Text,
} from "react-native";
/*import realmApp from "../../RealmApp";

let realm = new realmApp({
  schema: [
    {
      name: "Student_Info",
      properties: {
        student_id: { type: "int", default: 0 },
        student_name: "string",
        student_class: "string",
        student_subject: "string",
      },
    },
  ],
});

const sample = () => {
    realm.write(() => {
         realm.create('Student_Info', {
           student_id: 1, 
           student_name: "xxx", 
           student_class: "xxx",
           student_subject : "xxx",
          });
          
      });
};*/
const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View>
          <Button title="Update Stock" />
          <Image
            style={styles.logo}
            source={{
              uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/128/000000/external-inventory-factory-flaticons-flat-flat-icons.png",
            }}
          />
        </View>
        <View style={styles.item}>
          <Button title="View Receipts" />
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
