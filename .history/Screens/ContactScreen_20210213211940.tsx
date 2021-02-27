import * as React from 'react';
import {
    View,
    Text,
    StyleSheet
  } from "react-native";

export default class ContactScreen extends React.Component {
    render() {
        return(
            <View>
                <Text>
                    Contacts
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 20,
        fontWeight: "500",
        color: "red",
      },
})