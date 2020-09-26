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
import AsyncStorage from "@react-native-community/async-storage";
import ImagePicker from "react-native-image-crop-picker";
import axios from "axios";

export default class ProfileScreen extends React.Component {
  state = { userInfo: "", userImage: "" };

  signOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
    } catch (error) {
      console.error(error);
    }
    try {
      await AsyncStorage.removeItem("userUID");
    } catch (error) {
      console.error(error);
    }

    this.props.navigation.navigate("Auth");
  };

  intervalID;

  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getData = async () => {
    const uid = await AsyncStorage.getItem("userUID");
    await axios
      .post("https://grem-api.herokuapp.com/api/content/getuser", { uid: uid })
      .then((response) => {
        const respInfo = response.data["message"];
        this.setState({ userInfo: respInfo });
        this.intervalID = setTimeout(this.getData.bind(this), 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePFP = async () => {
    ImagePicker.openPicker({
      mediaType: "photo",
      width: 600,
      height: 600,
      cropping: true,
      multiple: false,
      includeBase64: true,
    }).then(async (image) => {
      await axios
        .post("https://grem-api.herokuapp.com/api/content/changepfp", {
          avatar: {},
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
      console.log(this.state.userImage);
    });
  };
  //unsubscribe = null;
  //TODO: MAKE LOGIC FOR REALTIME FOLLOWER UPDATES
  //componentDidMount() {
  //const user = this.props.uid || Fire.shared.uid;

  //this.unsubscribe = Fire.shared.firestore
  //.collection('users')
  //.doc(user)
  //.onSnapshot((doc) => {
  //this.setState({ user: doc.data() });
  //});
  //}

  //componentWillUnmount() {
  //this.unsubscribe();
  //}
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 64, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={this.changePFP}
          >
            <Image source={this.state.userInfo.avatar} style={styles.avatar} />
          </TouchableOpacity>
          <Text style={styles.name}>{this.state.userInfo["username"]}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>0</Text>
            <Text style={styles.statTitle}>POSTS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.userInfo.userFollowers}
            </Text>
            <Text style={styles.statTitle}>FOLLOWERS</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statAmount}>
              {this.state.userInfo.userFollowing}
            </Text>
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
