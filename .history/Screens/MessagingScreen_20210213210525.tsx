import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class MessagesScreen extends React.Component {
  state = {
    chats: [
      {
        userName: "Mom",
        recentMessage: "Get the groceries on your way home ! 😊",
        id: "1",
        avatar: {
          uri:
            "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        },
      },
      {
        userName: "Daniel",
        recentMessage: "Wanna hang out with the boys at 4? ",
        id: "3",
        avatar: {
          uri:
            "https://images.pexels.com/photos/412840/pexels-photo-412840.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        },
      },
      {
        userName: "Mike",
        recentMessage: "Yo, wanna play some multiplayer?",
        id: "2",
        avatar: {
          uri:
            "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        },
      },
    ],
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
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            marginBottom: "5%",
            marginLeft: "85%",
            marginRight: "3%",
            borderRadius: 35,
            width: 50,
            height: 50,
          }}
        >
          <Icon
            name="ios-add"
            color="black"
            size={48}
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
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
  avatar: {
    margin: 8,
    position: "absolute",
    marginLeft: "80%",
    width: 45,
    height: 45,
    borderRadius: 14,
    flexDirection: "column",
  },
  chatboxTextUsername: {
    ...Platform.select({
      ios: {
        marginTop: 8,
        marginLeft: 8,
        textAlign: "left",
        fontSize: 28,
        fontWeight: "500",
        color: "#454D65",
        justifyContent: "center",
        alignItems: "center",
      },
      android: {
        marginLeft: 8,
        textAlign: "left",
        fontSize: 24,
        fontWeight: "500",
        color: "#454D65",
        justifyContent: "center",
        alignItems: "center",
      },
    }),
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  chatbox: {
    ...Platform.select({
      ios: {
        shadowColor: "#FFF",
        shadowOffset: { height: 3 },
        shadowRadius: 8,
        shadowOpacity: 0.5,
      },
      android: {},
    }),

    borderRadius: 13,
    backgroundColor: "#FFF",
    marginHorizontal: 18,
    marginTop: 18,
    height: 70,
  },
  chatboxRecentMessage: {
    marginBottom: 6,
    fontWeight: "200",
    marginLeft: 8,
    fontSize: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
