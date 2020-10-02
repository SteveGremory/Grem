import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

export default class LoadingScreen extends React.Component {
  async componentDidMount() {
    try {
      const value = await EncryptedStorage.getItem("isLoggedIn");
      if (value == "true") {
        this.props.navigation.navigate("App");
      }
      if (value == "false" || value == null) {
        this.props.navigation.navigate("Auth");
      }
    } catch (err) {
      console.error(err);
    }
    //this.props.navigation.navigate("Auth");
  }

  render() {
    return (
      <View style={{ alignItems: "center", flex: 1, backgroundColor: "black" }}>
        <Image
          source={require("../assets/Logo.png")}
          style={{ width: "100%", height: "50%" }}
        />
        <ActivityIndicator
          style={{ flex: 1, marginBottom: 300 }}
          size="large"
        />
      </View>
    );
  }
}
