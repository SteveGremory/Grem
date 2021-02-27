import React from "react";
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  GiftedChat,
  Send,
  InputToolbar,
  Actions,
} from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-crop-picker";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios"; 
//SCREEN CLASS
export default class ChatScreen extends React.Component {
  state = {
    messages: [],
    userInfo: [],
  };

  get user() {
    return {
      name: this.state.userInfo.username,
    };
  }
  intervalID: any;
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data["message"];
        this.setState({ userInfo: respInfo });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const renderInputToolbar = (props) => (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderRadius: 25,
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 15,
        }}
        primaryStyle={{ alignItems: "center", justifyContent: "center" }}
      />
    );

    const renderSend = (props) => (
      <Send {...props} containerStyle={{}}>
        <Icon
          name="ios-arrow-forward"
          style={{ borderRadius: 20, borderColor: "red" }}
          size={40}
          color="black"
        ></Icon>
      </Send>
    );

    const selectImage = () => {
      ImagePicker.openPicker({
        width: 1366,
        height: 768,
        compressImageQuality: 1,
        cropping: true,
      }).then((image) => {
        this.setState({ userImage: image.data });
      });
    };

    const renderActions = (props) => (
      <Actions
        {...props}
        containerStyle={{
          width: 44,
          height: 32,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 4,
          marginTop: 4,
        }}
        options={{
          ["Send Image"]: selectImage,
        }}
        icon={() => <Icon name="ios-add" size={22} color="black"></Icon>}
        onSend={console.log()} //add logic to pick-a-pic here you idiot..TODO
        optionTintColor="White"
      />
    );

    if (Platform.OS === "android") {
      return (
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <View style={styles.header}>
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

            <Text style={styles.headerTitle}>
              {this.state.userInfo.username}
            </Text>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: "black" }}
            keyboardVerticalOffset={30}
            enabled
          >
            <GiftedChat
              renderSend={renderSend}
              renderInputToolbar={renderInputToolbar}
              messages={this.state.messages}
              onSend={console.log("SendPressed.")}
              user={this.user}
              scrollToBottom
              renderActions={renderActions}
              listViewProps={{
                style: {
                  backgroundColor: "black",
                },
              }}
            />
          </KeyboardAvoidingView>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <View style={styles.header}>
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

          <Text style={styles.headerTitle}>{this.state.userInfo.username}</Text>
        </View>
        <GiftedChat
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          messages={this.state.messages}
          onSend={console.log("SendPressed.")} //Fire.send
          user={this.user}
          scrollToBottom
          renderActions={renderActions}
          listViewProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        />
      </View>
    );
  }
}
//STYLES.
const styles = StyleSheet.create({
  sendingContainer: {
    borderRadius: 24,
    backgroundColor: "rgba(21, 22, 42, 0.2)",
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
    shadowOffset: { height: 5, width: 10 },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    zIndex: 16,
    marginBottom: 10,
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: "red",
    textAlign: "center",
  },
  sendArrow: {
    backgroundColor: "black",
    borderRadius: 20,
  },
  back: {
    marginLeft: -80,
    borderRadius: 20,
    backgroundColor: "rgba(21, 22, 48, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
});
