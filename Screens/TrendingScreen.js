import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default class TrendingScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Trending</Text>
        </View>
        <ScrollView>
          <Text style={styles.textStyle}>Coming Soon!</Text>
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
