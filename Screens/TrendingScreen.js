import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

export default class TrendingScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = { search: "", userInfo: "", loading: false };

  updateSearch = async (search) => {
    await this.setState({ search: search });
    let data = {
      username: this.state.search,
    };
    await axios
      .post("https://grem-api.herokuapp.com/api/actions/findbyusername", data)
      .then((result) => {
        this.setState({ userInfo: result.data["message"] });
        this.setState({});
      });
  };
  searchIcon = (props) => {
    return <Icon name="search-outline" size={32} color="white"></Icon>;
  };
  clearIcon = (props) => {
    return <Icon name="close-outline" size={32} color="white"></Icon>;
  };
  onClear = (props) => {
    this.setState({ search: "" });
  };
  renderUser = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("OtherProfile", {
            username: item.username,
          });
        }}
      >
        <View style={styles.userItem}>
          <Image source={item.avatar} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text style={styles.name}>{item.username}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending</Text>
        </View>

        <View>
          <SearchBar
            placeholder="This Field is CaSe_SeNsEtIvE"
            onChangeText={this.updateSearch}
            value={search}
            clearIcon={this.clearIcon}
            onClear={this.onClear}
            lightTheme={false}
            searchIcon={this.searchIcon}
            round={true}
            placeholderTextColor="#F5F5F5"
            color="white"
            autoCapitalize="none"
            showLoading={this.props.loading}
          />
        </View>
        <View>
          <FlatList
            style={styles.user}
            data={this.state.userInfo}
            renderItem={({ item }) => this.renderUser(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  user: {
    marginTop: 10,
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  userItem: {
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
  textStyle: {
    flex: 1,
    textAlign: "center",
    alignContent: "center",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 64,
    fontWeight: "200",
  },
});
