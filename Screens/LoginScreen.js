import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

const validate = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const result = expression.test(String(email).toLowerCase());
  return result;
};

export class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
    isLoggedIn: "false",
    responseUID: "",
  };
  //Login Handler
  //TODO: get it to log in and display le home page and keep user logged in.
  //you could use async storage to store and remove user shit

  handleLogin = async () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
      //other data key value pairs
    };
    if (validate(this.state.email) == false) {
      this.setState({
        errorMessage: "A valid e-mail is required for logging in.",
      });
    }
    if (this.state.email == "") {
      this.setState({
        errorMessage: "A valid e-mail is required for logging in.",
      });
    }
    if (this.state.password == "") {
      this.setState({
        errorMessage: "A valid password is required for logging in.",
      });
    } else if (
      this.state.email != "" &&
      this.state.password != "" &&
      validate(this.state.email) == true
    ) {
      await axios
        .post("https://grem-api.herokuapp.com/api/users/login", data)
        .then((response) => {
          this.setState({ responseUID: response.data.uid });
          Alert.alert("Logged In!", "'Enjoy freedom!'");
          this.setState({ isLoggedIn: "true" });
          this.props.navigation.navigate("App");
        })
        .catch((err) => {
          if (err.message == "Request failed with status code 401") {
            this.setState({
              errorMessage: "Sign In Failed, check your email and password.",
            });
          }
          if (err.message == "Network Error") {
            this.setState({
              errorMessage: "Network Error.",
            });
          }
          if (err.message == "Request failed with status code 503") {
            this.setState({
              errorMessage: "Server unreachable.",
            });
          }
          console.error(err.message);
        });
      try {
        await AsyncStorage.setItem("isLoggedIn", this.state.isLoggedIn);
      } catch (err) {
        console.error(err);
      }
      try {
        await AsyncStorage.setItem("userUID", this.state.responseUID);
      } catch (err) {
        console.error(err);
      }
    }
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1, backgroundColor: "black" }}
      >
        <View style={styles.container}>
          <StatusBar barStyle="light-content"></StatusBar>
          <Image
            source={require("../assets/Logo.png")}
            style={{
              width: "100%",
              height: "50%",
              marginTop: -24,
            }}
          ></Image>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              ></TextInput>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              ></TextInput>
            </View>
          </View>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "white", fontWeight: "500" }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 32,
            }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "#d3d3d3", fontSize: 14, fontWeight: "400" }}>
              New To Grem?
              <Text style={{ fontWeight: "300", color: "red", fontSize: 16 }}>
                Join the revolution!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  errorMessage: {
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  form: {
    marginTop: -12,
    marginHorizontal: 32,
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize: 10,
    textTransform: "uppercase",
  },
  input: {
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "white",
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "magenta",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});
export default LoginScreen;
