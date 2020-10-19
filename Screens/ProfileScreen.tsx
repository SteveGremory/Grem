import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

export default class ProfileScreen extends React.Component {
  state = {
    userFollowers: 0,
    userPFP: " ",
    userFollowing: 0,
    userName: " ",
    userPostsNumber: 0,
    userPosts: [],
    refreshing: false,
  };

  signOut = async () => {
    try {
      await EncryptedStorage.setItem("isLoggedIn", "false");
    } catch (error) {
      console.error(error);
    }
    try {
      await EncryptedStorage.removeItem("userUID");
    } catch (error) {
      console.error(error);
    }

    this.props.navigation.navigate("Auth");
  };

  componentDidMount() {
    this.getData();
  }

  settings = () => {
    console.log("settingsPressed.");
  };

  getData = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data.message;
        this.setState({
          userFollowers: respInfo.userFollowers,
        });
        this.setState({ userPFP: respInfo.avatar });
        this.setState({ userFollowing: respInfo.userFollowing });
        this.setState({ userName: respInfo.username });
        this.setState({ userPostsNumber: respInfo.postsNumber });
        this.setState({ userPosts: respInfo.posts });
        this.setState({ refreshing: false });
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
            source={{ uri: this.state.userPFP }}
            style={styles.avatarPost}
          />
          <View style={styles.iconView}>
            <TouchableOpacity style={styles.iconProps}>
              <Icon name="heart-outline" size={30} />
              <Text style={styles.statPost}>100</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconProps}>
              <Icon name="chatbubble-ellipses-outline" size={30} />
              <Text style={styles.statPost}>100</Text>
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
              <Text style={styles.namePost}>{this.state.userName}</Text>
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
  onRefresh = () => {
    this.getData;
    this.setState({ refreshing: true }, this.getData);
  };

  changePFP = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 600,
      height: 600,
      cropping: true,
      compressImageQuality: 0.6,
      multiple: false,
      includeBase64: true,
    }).then(async (image) => {
      this.setState({ userImage: `data:${image.mime};base64,${image.data}` });
      await axios
        .post("https://grem-api.herokuapp.com/api/actions/changepfp", {
          avatar: this.state.userImage,
          uid: uid,
        })
        .then((resp) => {
          Alert.alert("Profile Picture Changed Successfully!", "😎");
        })
        .catch((err) => {
          Alert.alert("Profile Picture wasn't changed...", "🥺");
          console.error(err);
        });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="red"
              title="Getting Fresh Posts..."
              titleColor="red"
            />
          }
        >
          <View style={{ marginTop: 64, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.avatarContainer}
              onPress={this.changePFP}
            >
              <Image
                source={{ uri: this.state.userPFP }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{this.state.userName}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>
                {this.state.userPostsNumber}
              </Text>
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

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.signOut} onPress={this.signOut}>
              <Text style={styles.signOutText}>LOG OUT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signOut} onPress={this.settings}>
              <Text style={styles.signOutText}>SETTINGS</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            style={styles.feed}
            data={this.state.userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => this.renderPost(item)}
            showsVerticalScrollIndicator={false}
          />
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 6,
    margin: 32,
  },
  signOut: {
    backgroundColor: "black",
    borderColor: "red",
    borderWidth: 2,
    borderRadius: 100,
    shadowColor: "red",
    shadowOffset: { height: 3 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
  },
  signOutText: {
    color: "red",
    fontSize: 22,
    padding: 10,
    fontWeight: "200",
  },
  profile: {
    marginTop: 32,
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
});
