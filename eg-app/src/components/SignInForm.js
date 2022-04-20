import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../../firebase";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  Button,
} from "react-native";
import logo from "../../assets/Logo.png";
import { useDispatch } from "react-redux";

const SignInForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showText, setShowText] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  let dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

  const handleLogIn = async () => {
    try {
      if (!email) {
        alert("Missing Email!");
        return;
      }
      if (!password) {
        alert("Missing Password!");
        return;
      }
      setShowText(false);
      setIsLoading(true);
      var res = await auth.signInWithEmailAndPassword(email, password);
      const { user } = res;
      const idTokenResult = await user.getIdTokenResult();
      if (user) {
        dispatch({
          type: "LOGGED_IN",
          payload: {
            user: user.email,
            token: idTokenResult.token,
          },
        });
        navigation.navigate("Home");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (err) {
      console.log(err);
      alert("User not found!");
      setIsLoading(false);
      setShowText(true);
    } finally {
      setIsLoading(false);
      setShowText(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo}></Image>
      <View></View>
      <View style={styles.box}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            keyboardType="email-address"
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry={hidePass ? true : false}
            autoCompleteType="password"
            style={styles.inputText}
            placeholder="Enter Password"
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
        <TouchableHighlight onPress={handleLogIn}>
          <View style={styles.loginBtn}>
            <Text>
              {showText == true ? (
                "Sign In"
              ) : (
                <ActivityIndicator  color="#0000ff" size="small" animating={isLoading} />
              )}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      {/* <Button title="shortcut" onPress={() => navigation.navigate("Home")} /> */}
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
    backgroundColor: "#ffff",
  },
  image: {
    width: 250,
    height: 200,
    resizeMode: "contain",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#ffff",
    borderColor: "#D82148",
    borderWidth: 2,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
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
export default SignInForm;
