import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import axios from "axios";
import moment from "moment";
import EncryptedStorage from "react-native-encrypted-storage";
import Icon from "react-native-vector-icons/Ionicons";

export default class CommentScreen extends React.Component {
  state = {
    userInfo: "",
    post: {
      image: "",
      text: "",
    },
    comments: [],
  };

  componentDidMount() {
    this.getComments();
  }

  getComments = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    const postUID = this.props.navigation.getParam("postUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/get-comments", {
        uid: uid,
        postUID: postUID,
      })
      .then((response) => {
        this.setState({ comments: response.data.message });
      });
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data.message;
        const respPosts = respInfo.posts;
        const foundValue = respPosts.filter((obj) => obj.postUID === postUID);
        this.setState({ post: foundValue[0] });
        this.setState({ userInfo: respInfo });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderComments = (item: Object) => {
    return (
      <View>
        <TouchableOpacity>
          <View style={styles.userItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text style={styles.nameComment}>{item.username}</Text>
                  <Text style={styles.messageText}>{item.comment}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 20, color: "white" }}>Share!</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.feed}>
          <View style={styles.feedItem}>
            <View style={{ flexDirection: "column" }}>
              <Image
                source={{ uri: this.props.navigation.getParam("postAvatar") }}
                style={styles.avatar}
              />
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
                  <Text style={styles.name}>
                    {this.props.navigation.getParam("postUsername")}
                  </Text>
                  <Text style={styles.timestamp}>
                    {moment(
                      this.props.navigation.getParam("postTimestamp")
                    ).fromNow()}
                  </Text>
                </View>
              </View>

              <Text style={styles.post}>
                {this.props.navigation.getParam("postText")}
              </Text>

              <Image
                source={{ uri: this.props.navigation.getParam("postImage") }}
                style={styles.postImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <FlatList
          style={styles.comments}
          data={this.state.comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => this.renderComments(item)}
          showsVerticalScrollIndicator={false}
        />
        <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
          <TextInput
            style={styles.enterComment}
            placeholder="Comment Something!"
            placeholderTextColor="#000"
            placeholderTextColor="#000"
            numberOfLines="4"
            multiline
          ></TextInput>
          <View style={{ position: "absolute" }}>
            <TouchableOpacity>
              <Icon
                name="ios-arrow-forward"
                style={{ borderRadius: 20, borderColor: "red" }}
                size={40}
                color="black"
              ></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  enterComment: {
    width: "100%",
    height: 40,
    borderRadius: 20,
    marginVertical: 8,
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingTop: 11,
    paddingRight: 11,
    paddingLeft: 11,
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  feed: {
    marginTop: 20,
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
  nameComment: {
    fontSize: 15,
    fontWeight: "400",
    color: "white",
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  messageText: {
    color: "white",
    fontSize: 15,
    fontWeight: "300",
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
    height: 160,
    borderRadius: 10,
    marginVertical: 15,
  },
  comments: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  userItem: {
    borderWidth: 2,
    borderBottomColor: "red",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
});
