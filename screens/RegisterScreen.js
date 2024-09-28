import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();
  
  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://ip:3000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        Alert.alert(
          "Registration failed",
          "An error occurred during registration"
        );
        console.log("error", error);
      });
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-photo/nice-yellow-green-mixed-gradient-vertical-design-background_7954-31718.jpg' }}  // Leave this empty for now, you'll set the image URI later
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('./tech.png')}
          />
        </View>

        <KeyboardAvoidingView>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Register An Account</Text>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Ionicons style={styles.icon} name="person" size={24} color="gray" />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor={"gray"}
                style={styles.textInput}
                placeholder="Enter your Name"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <MaterialIcons style={styles.icon} name="email" size={24} color="gray" />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor={"gray"}
                style={styles.textInput}
                placeholder="Enter your Email"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <AntDesign style={styles.icon} name="lock" size={24} color="gray" />
              <TextInput
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor={"gray"}
                style={styles.textInput}
                placeholder="Enter your Password"
              />
            </View>
          </View>

          <Pressable
            onPress={handleRegister}
            style={styles.registerButton}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          <Text style={styles.signInText}>Already have an account?</Text>

          <Pressable onPress={() => navigation.goBack()} style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  heading: {
    fontSize: 17,
    fontWeight: "bold",
  },
  inputContainer: {
    marginTop: 30,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#D0D0D0",
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 5,
    width: 300,
  },
  icon: {
    marginLeft: 8,
  },
  textInput: {
    color: "gray",
    marginVertical: 10,
    width: 250,
    fontSize: 16,
  },
  registerButton: {
    width: 200,
    backgroundColor: "green",
    padding: 15,
    marginTop: 20,
    borderRadius: 46,
    alignSelf: "center",
  },
  registerButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  signInText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },
  signInButton: {
    marginTop: 30,
  },
  signInButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "green",
  },
});
