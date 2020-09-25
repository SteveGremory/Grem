import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

export default class TrendingScreen extends React.Component {
  updateSearch = async (search) => {
    await this.setState({ search: search });
    let data = {
      username: this.state.search,
    };
    await axios
      .post("https://grem-api.herokuapp.com/api/content/findbyusername", data)
      .then((result) => {
        this.setState({ userInfo: result.data["message"] });
      });
  };
  searchIcon = (props) => {
    return <Icon name="search-outline" size={32} color="white"></Icon>;
  };
  clearIcon = (props) => {
    return <Icon name="close-outline" size={32} color="white"></Icon>;
  };
  renderUser = (item) => {
    return (
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
    );
  };

  state = { search: "", userInfo: "" };

  render() {
    const { search } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending</Text>
        </View>
        <ScrollView>
          <View>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              clearIcon={this.clearIcon}
              lightTheme={false}
              searchIcon={this.searchIcon}
              placeholder="Search username"
              round={true}
              placeholderTextColor="white"
              color="white"
              autoCapitalize={false}
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
        </ScrollView>
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
