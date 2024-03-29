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
  ActivityIndicator,
} from "react-native";

import EncryptedStorage from "react-native-encrypted-storage";

import Icon from "react-native-vector-icons/Ionicons";

import axios from "axios";

import ImagePicker from "react-native-image-crop-picker";
import { ScrollView } from "react-native-gesture-handler";

export default class PostScreen extends React.Component {
  componentDidMount() {
    this.getData();
  }
  state = {
    text: "",
    userImage: null,
    userPFP: null,
    oldPosts: null,
    loading: false,
    userPosts: [],
  };

  getData = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data["message"];
        const oldPosts = respInfo.postsNumber;
        this.setState({ userPFP: respInfo.avatar });
        this.setState({ oldPosts: oldPosts });
        this.setState({ userPosts: respInfo.posts });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  uploadPost = async () => {
    this.setState({ loading: true });
    const uid = await EncryptedStorage.getItem("userUID");
    const data = {
      uid: uid,
      id: Number.MAX_SAFE_INTEGER - this.state.oldPosts,
      text: this.state.text,
      image: this.state.userImage,
    };
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/post", data)
      .then((response) => {
        Alert.alert("Post Successful!", "😎", [
          {
            text: "COOL!",
            onPress: () => this.props.navigation.navigate("App"),
          },
        ]);
        this.setState({ text: "", userImage: null });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        Alert.alert("Upload Failed.", "🥺", [
          {
            text: "PFFT OK!",
            onPress: () => this.props.navigation.navigate("App"),
          },
        ]);
        console.error(err);
      });
  };

  selectImage = async () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      compressImageQuality: 0.6,
      width: 1366,
      height: 768,
      cropping: true,
      multiple: false,
      includeBase64: true,
    }).then((image) => {
      this.setState({ userImage: `data:${image.mime};base64,${image.data}` });
    });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="ios-arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.uploadPost}>
            {this.state.loading ? (
              <ActivityIndicator color="black" size="small" />
            ) : (
              <Text style={{ fontSize: 20 }}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <Image
              //todo: you have to set the logic to get the dp from a json file from ipfs and then set it as source down below...
              source={{ uri: this.state.userPFP }}
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
    margin: 24,
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
