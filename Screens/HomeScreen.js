import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";

//const CancelToken = axios.CancelToken;
//const source = CancelToken.source();

export default class HomeScreen extends React.Component {
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {}

  getData = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/content/getuser", { uid: uid })
      .then((response) => {
        const respPosts = response.data["message"]["posts"];
        const respInfo = response.data["message"];
        this.setState({ userPosts: respPosts });
        this.setState({ userInfo: respInfo });
        this.setState({ refreshing: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onRefresh = () => {
    this.getData;
    this.setState({ refreshing: true }, this.getData);
  };

  state = { userPosts: [], userInfo: "", refreshing: false };
  renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={this.state.userInfo.avatar} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{this.state.userInfo.username}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>
            <TouchableOpacity>
              <Icon
                name="ios-ellipsis-horizontal-outline"
                size={24}
                color="#73788B"
              />
            </TouchableOpacity>
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Feed</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => this.renderPost(item)}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
              tintColor="red"
              title="Getting Fresh Posts..."
              titleColor="red"
            />
          }
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
  header: {
    ...Platform.select({
      ios: {
        paddingTop: 38,
        shadowColor: "red",
        shadowOffset: { height: 5 },
        shadowRadius: 15,
        shadowOpacity: 0.5,
        zIndex: 16,
      },
      android: {
        paddingTop: 16,
        borderRadius: 20,
      },
    }),
    paddingBottom: 16,
    color: "red",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "red",

    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "red",
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
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
