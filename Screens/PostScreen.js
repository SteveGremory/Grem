import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import Icon from "react-native-vector-icons/Ionicons";

import axios from "axios";

import { Permission, PERMISSION_TYPE } from "../AppPermissions";

import ImagePicker from "react-native-image-crop-picker";
import { ScrollView } from "react-native-gesture-handler";

export default class PostScreen extends React.Component {
  //componentDidMount() {
  //Permission.checkPermission(PERMISSION_TYPE.photo);
  //}

  state = {
    text: "",
    userImage: "",
  };

  uploadPost = async () => {
    const uid = await AsyncStorage.getItem("userUID");
    console.log(uid);
    const data = {
      uid: uid,
      id: "1",
      text: this.state.text,
      image: this.state.text, //HELP, TODO
    };

    await axios
      .post("https://grem-api.herokuapp.com/api/content/post", data)
      .then((response) => {
        Alert.alert("Post Successful!", "😎");
        console.log(response.data);
      })
      .catch((err) => {
        Alert.alert("Upload Failed.", "🥺");
        console.error(err);
      });
  };

  selectImage = async () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 1366,
      height: 768,
      cropping: true,
      multiple: false,
      includeBase64: true,
    }).then((image) => {
      this.setState({ userImage: `data:${image.mime};base64,${image.data}` });
      console.log(this.state.userImage);
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.uploadPost}>
              <Text style={{ fontSize: 20 }}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image
              //todo: you have to set the logic to get the dp from a json file from ipfs and then set it as source down below...
              source={require("../assets/LoginBackground.png")}
              style={styles.avatar}
            ></Image>
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={5}
              style={{ flex: 1 }}
              value={this.state.text}
              onChangeText={(text) => this.setState({ text })}
              placeholder="Share Something Publicly!"
            ></TextInput>
          </View>

          <TouchableOpacity style={styles.photo} onPress={this.selectImage}>
            <Icon name="md-camera" size={32} color="#D8D9DB" />
          </TouchableOpacity>
          <View
            style={{ flex: 1, marginLeft: 32, marginRight: 32, marginTop: 32 }}
          >
            <Image
              source={{ uri: this.state.userImage }}
              style={{
                aspectRatio: 16 / 9,
                width: "100%",
                height: "100%",
                borderRadius: 10,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D8D9DB",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: "flex-end",
    marginHorizontal: 32,
  },
});
