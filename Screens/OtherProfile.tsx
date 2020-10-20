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
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import moment from "moment";
import EncryptedStorage from "react-native-encrypted-storage";

export default class OtherProfile extends React.Component {
  state = {
    userInfo: [],
    isFollowing: false,
    followerUsername: "",
    usrname: "",
  };

  async componentDidMount() {
    await this.getDataOther();
    await this.getData();
    await this.isFollowingCheck();
  }

  isFollowingCheck = async () => {
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/is-following", {
        followerUsername: this.state.userInfo.username,
        followingUsername: this.state.followerUsername,
      })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message == "false") {
          this.setState({ isFollowing: false });
        } else if (res.data.message == "true") {
          this.setState({ isFollowing: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDataOther = async () => {
    const usrname = this.props.navigation.getParam("username");
    this.setState({ usrname: usrname });
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/findbyusername", {
        username: usrname,
      })
      .then(async (response) => {
        this.setState({ userInfo: response.data.message });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getData = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data.message;
        this.setState({ followerUsername: respInfo.username });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <View style={{ flexDirection: "column" }}>
          <Image
            source={{ uri: this.state.userInfo.avatar }}
            style={styles.avatarPost}
          />
          <View style={styles.iconView}>
            <TouchableOpacity style={styles.iconProps}>
              <Icon name="heart-outline" size={30} />
              <Text style={styles.statPost}>{post.likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconProps}
              onPress={() => {
                this.props.navigation.navigate("commentModal", {
                  postUID: post.postUID,
                  postImage: post.image,
                  postText: post.text,
                  postUsername: this.state.userInfo.username,
                  postAvatar: this.state.userInfo.avatar,
                });
              }}
            >
              <Icon name="chatbubble-ellipses-outline" size={30} />
              <Text style={styles.statPost}>{post.commentsNumber}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.namePost}>
                {this.state.userInfo.username}
              </Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
          </View>

          <Text style={styles.post}>{post.text}</Text>

          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  handleFollow = async () => {
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/follow", {
        followerUsername: this.state.userInfo.username,
        followingUsername: this.state.followerUsername,
      })
      .then((res) => {
        this.setState({ isFollowing: true });
      })
      .catch((err) => {
        Alert.alert("Couldn't Follow.");
      });
  };

  //write logic plsss
  handleMessage = async () => {
    console.log("FIX THIS SHIT YOU ASSHOLE!");
  };

  handleUnfollow = async () => {
    console.log("ASYNC BABY, ASYNC");
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("App")} //.goBack()
        >
          <Icon
            style={styles.back}
            name="ios-arrow-back"
            size={32}
            color="white"
          ></Icon>
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

        <View style={styles.actionsContainer}>
          {this.state.isFollowing ? (
            <TouchableOpacity
              style={styles.following}
              onPress={this.handleUnfollow}
            >
              <Text style={styles.followingText}>FOLLOWING</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.follow} onPress={this.handleFollow}>
              <Text style={styles.followText}>FOLLOW</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.message} onPress={this.handleMessage}>
            <Text style={styles.messageText}>MESSAGE</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.userInfo.posts}
          renderItem={({ item }) => this.renderPost(item)}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 6,
    margin: 32,
  },
  follow: {
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: "red",
    shadowOffset: { height: 3 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  followText: {
    color: "red",
    fontSize: 22,
    padding: 10,
    fontWeight: "200",
  },
  //display when isFollowing = true.
  following: {
    backgroundColor: "red",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 100,
    shadowColor: "red",
    shadowOffset: { height: 3 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  followingText: {
    color: "black",
    fontSize: 22,
    padding: 10,
    fontWeight: "200",
  },
  message: {
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: "red",
    shadowOffset: { height: 3, width: 10 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  messageText: {
    color: "red",
    fontSize: 22,
    padding: 10,
    fontWeight: "200",
  },
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
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatarPost: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  namePost: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 10,
    marginVertical: 15,
  },
  iconView: {
    alignSelf: "flex-start",
    marginTop: "150%",
    marginLeft: "2%",
    marginRight: "2%",
    justifyContent: "space-between",
  },
  iconProps: {
    marginBottom: 2,
  },
  statPost: {
    fontSize: 11,
    color: "#595959",
    marginTop: 4,
    marginBottom: 4,
    alignSelf: "center",
  },
});
