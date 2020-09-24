import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import userInfo from "../user.js";
import AsyncStorage from "@react-native-community/async-storage";

export default class ProfileScreen extends React.Component {
  state = userInfo;

  signOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      await AsyncStorage.removeItem("userUID");
      this.props.navigation.navigate("Auth");
    } catch (err) {
      console.info(err);
    }
  };

  //unsubscribe = null;
  //TODO: MAKE LOGIC FOR REALTIME FOLLOWER UPDATES
  //componentDidMount() {
  //const user = this.props.uid || Fire.shared.uid;

  //this.unsubscribe = Fire.shared.firestore
  //.collection('users')
  //.doc(user)
  //.onSnapshot((doc) => {
  //this.setState({ user: doc.data() });
  //});
  //}

  //componentWillUnmount() {
  //this.unsubscribe();
  //}
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              source={
                this.state.userAvatar
                  ? this.state.userAvatar
                  : require("../assets/tempAvatar.jpg")
              }
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{this.state.userRealName}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{this.state.userPosts}</Text>
            <Text style={styles.statTitle}>POSTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{this.state.userFollowers}</Text>
            <Text style={styles.statTitle}>FOLLOWERS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{this.state.userFollowing}</Text>
            <Text style={styles.statTitle}>FOLLOWING</Text>
          </View>
        </View>

        <ScrollView style={{ backgroundColor: "black" }}>
          <Button onPress={this.signOut} title="Log out" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  profile: {
    marginTop: 64,
    alignItems: "center",
  },
  avatarContainer: {
    shadowColor: "red",
    shadowRadius: 40,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    margin: 32,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statAmount: {
    color: "white",
    fontSize: 18,
    fontWeight: "300",
  },
  statTitle: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
