import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import axios from "axios";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

export default class CommentScreen extends React.Component {
  state = {
    post: {
      postUID: "String",
    },
    userInfo: [
      {
        id: "1",
        username: "Username-One",
        comment: "Yooooo, this is cool fr mane",
      },
      {
        id: "2",
        username: "Username-Two",
        comment: "Noice. Nigga.",
        avatar: require("../assets/Logo.png"),
      },
    ],
  };

  getComments = async () => {
    const postUid = this.props.navigation.getParam("postUid");
  };

  renderComments = (item: Object) => {
    return (
      <View>
        <TouchableOpacity>
          <View style={styles.userItem}>
            <Image
              source={require("../assets/Logo.png")}
              style={styles.avatar}
            />
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
                source={require("../assets/Logo.png")}
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
                  <Text style={styles.name}>Tejveer</Text>
                  <Text style={styles.timestamp}>{moment(1).fromNow()}</Text>
                </View>
              </View>

              <Text style={styles.post}>bEHOLD, NIGGA.</Text>

              <Image
                source={require("../assets/LoginBackground.png")}
                style={styles.postImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>
        <FlatList
          style={styles.comments}
          data={this.state.userInfo}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => this.renderComments(item)}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
