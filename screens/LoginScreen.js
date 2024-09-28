import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          setTimeout(() => {
            navigation.replace("Main");
          }, 400);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    axios
      .post("http://ip:3000/login", user)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        navigation.navigate("Main");
      })
      .catch((error) => {
        Alert.alert("Login error");
        console.log("error ", error);
      });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-photo/nice-yellow-green-mixed-gradient-vertical-design-background_7954-31718.jpg' }}  // Placeholder for your image source
      style={styles.backgroundImage}
    >
      <SafeAreaView
        style={{ flex: 1, alignItems: "center" }}
      >
        <View style={{ marginTop: 50 }}>
          <Image
            style={{ width: 150, height: 100, resizeMode: "contain" }}
            source={require('./tech.png')}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25 }}>
              Welcome Back!
            </Text>
          </View>

          <View style={{ marginTop: 40 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 20,
              }}
            >
              <MaterialIcons
                style={{ marginLeft: 8 }}
                name="email"
                size={24}
                color="gray"
              />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={"gray"}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: email ? 16 : 16,
                  paddingLeft: 10,
                }}
                placeholder="Enter your Email"
              />
            </View>

            <View style={{ marginTop: 30 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  paddingVertical: 5,
                  borderRadius: 20,
                }}
              >
                <AntDesign
                  style={{ marginLeft: 8 }}
                  name="lock"
                  size={24}
                  color="gray"
                />
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholderTextColor={"gray"}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: password ? 16 : 16,
                    paddingLeft: 10,
                  }}
                  placeholder="Enter your Password"
                />
              </View>
            </View>
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 170,
              backgroundColor: "darkgreen",
              padding: 10,
              marginTop: 40,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 46,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "white",
              }}
            >
              Login
            </Text>
          </Pressable>

          <Text style={{ textAlign: "center", fontSize: 16, marginTop: 10 }}>
            Don't have an account?
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={{ marginTop: 30 }}
          >
            <Text style={{ textAlign: "center", fontSize: 16, color: "darkgreen" }}>
              Sign up
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
