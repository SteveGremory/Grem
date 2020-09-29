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
import EncryptedStorage from "react-native-encrypted-storage";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";

export default class ProfileScreen extends React.Component {
  state = {
    userFollowers: null,
    userPFP: "",
    userFollowing: null,
    userPosts: null,
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

  getData = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data["message"];
        this.setState({
          userFollowers: respInfo.userFollowers,
        });
        this.setState({ userPFP: respInfo.avatar });
        this.setState({ userFollowing: respInfo.userFollowing });
        this.setState({ userName: respInfo.username });
        this.setState({ userPosts: respInfo.postsNumber });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePFP = async () => {
    const uid = await EncryptedStorage.getItem("userUID");
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 600,
      height: 600,
      cropping: true,
      multiple: false,
      includeBase64: true,
    }).then(async (image) => {
      await axios
        .post("https://grem-api.herokuapp.com/api/actions/changepfp", {
          avatar: this.state.userImage,
          uid: uid,
        })
        .then((resp) => {
          Alert.alert("Profile Picture Changed Successfully!", "😎");
          console.log(resp.data.message);
        })
        .catch((err) => {
          Alert.alert("Profile Picture wasn't changed...", "🥺");
          console.error(err);
        });

      this.setState({ userImage: `data:${image.mime};base64,${image.data}` });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={this.changePFP}
          >
            <Image source={this.state.userPFP} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.name}>{this.state.userName}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>{this.state.userPosts}</Text>
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

        <ScrollView style={{ backgroundColor: "black" }}>
          <Button onPress={this.signOut} title="Log out" />
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
});
