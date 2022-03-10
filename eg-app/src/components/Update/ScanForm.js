import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

export default function ScanForm({ navigation }) {
  const { products } = useSelector((state) => state.products);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    if(products.length>0){
      console.log(products[0].products);
    }
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    const res = await BarCodeScanner.scanFromURLAsync(result.uri);
    if (res[0].data) {
      const product = products[0].products.find((x) => x.code == res[0].data);
      if (!product) {
        alert(`Product with ${res[0].data} not found `);
        setScanned(false);
        return;
      } else {
        navigation.navigate("CreateGrForm", {
          productId: product._id,
          productCode: product.code,
          productName: product.name,
          productUom: product.uom
        });
      }
    } else {
      alert("Error Scanning");
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const product = products[0].products.find((x) => x.code == data);
    if (!product) {
      alert(`Product with ${data} not found `);
      setScanned(false);
      return;
    } else {
      setScanned(false);
      navigation.navigate("CreateGrForm", {
        productId: product._id,
        productCode: product.code,
        productName: product.name,
        productUom: product.uom
      });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <View style={styles.container}>
        {isFocused && (
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        )}
      </View>
      <View style={styles.barContainer}>
        <TouchableHighlight onPress={pickImage}>
          <View style={styles.scanBtn}>
            <Text>Scan from gallery</Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "90%",
  },

  barContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
  },
  scanBtn: {
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: "#151D3B",
  },
});
