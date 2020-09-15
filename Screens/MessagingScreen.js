import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import user from "../user.js";

export default class MessagesScreen extends React.Component {
  state = {
    chats: [
      {
        userName: "Mom",
        recentMessage: "Get the groceries on your way home ! 😊",
        id: 1,
        avatar: {
          uri:
            "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        },
      },
      {
        userName: "Daniel",
        recentMessage: "Hey dude, wanna hang out with the boys at 4? ",
        id: 3,
        avatar: {
          uri:
            "https://images.pexels.com/photos/412840/pexels-photo-412840.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        },
      },
      {
        userName: "Mike",
        recentMessage: "Yo, wanna play some multiplayer?",
        id: 2,
        avatar: {
          uri:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        },
      },
    ],
    userInfo: user,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>

        <FlatList
          data={this.state.chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.chatbox}
                onPress={() => this.props.navigation.navigate("Chat")}
              >
                <Text style={styles.chatboxTextUsername}>{item.userName}</Text>
                <Text style={styles.chatboxRecentMessage}>
                  {item.recentMessage}
                </Text>
                <Image source={item.avatar} style={styles.avatar} />
              </TouchableOpacity>
            </View>
          )}
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
      },
      android: {
        paddingTop: 16,
      },
    }),
    paddingBottom: 16,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "red",
    shadowColor: "red",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    zIndex: 16,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "red",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    flexDirection: "column",
  },
  chatboxTextUsername: {
    marginTop: 6,
    marginLeft: 8,
    textAlign: "left",
    fontSize: 28,
    fontWeight: "500",
    color: "#454D65",
    justifyContent: "center",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  chatbox: {
    shadowColor: "#FFF",
    shadowOffset: { height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    borderRadius: 13,
    backgroundColor: "#FFF",
    marginHorizontal: 18,
    marginTop: 20,
    height: 64,
  },
  chatboxRecentMessage: {
    marginBottom: 6,
    fontWeight: "200",
    marginLeft: 8,
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    margin: 8,
    position: "absolute",
    marginLeft: "80%",
  },
});
