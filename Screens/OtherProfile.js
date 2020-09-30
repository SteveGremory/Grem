//get the user's email form the username search then store in async and then put it here to get their account and show their info

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
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default class OtherProfile extends React.Component {
  state = {
    userInfo: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const usrname = this.props.navigation.getParam("username");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/findbyusername", {
        username: usrname,
      })
      .then((response) => {
        const respInfo = response.data.message;
        console.log(respInfo);
        this.setState({ userInfo: respInfo });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => this.props.navigation.navigate("App")}
        >
          <Icon name="ios-arrow-back" size={32} color="white"></Icon>
        </TouchableOpacity>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: this.state.userInfo.avatar }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{this.state.userInfo.username}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.userInfo.postsNumber}
            </Text>
            <Text style={styles.statTitle}>POSTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.userInfo.userFollowers}
            </Text>
            <Text style={styles.statTitle}>FOLLOWERS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.userInfo.userFollowing}
            </Text>
            <Text style={styles.statTitle}>FOLLOWING</Text>
          </View>
        </View>

        <FlatList
          style={styles.feed}
          style={{ backgroundColor: "black" }}
          data={this.state.userPosts}
          renderItem={({ item }) => this.renderPost(item)}
          showsVerticalScrollIndicator={false}
        />
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
    fontSize: 20,
    fontWeight: "500",
    color: "white",
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
  back: {
    position: "absolute",
    top: 32,
    left: 32,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
