import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Fire from '../Fire';

export default class ChatScreen extends React.Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.uid,
      name: firebase.auth().currentUser.displayName,
    };
  }

  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      })),
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  render() {
    renderSend = (props) => {
      return (
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <Icon name="ios-arrow-forward" size={32} color="red" />
          </View>
        </Send>
      );
    };
    if (Platform.OS === 'android') {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1, backgroundColor: 'black' }}
          keyboardVerticalOffset={30}
          enabled>
          {chat}
        </KeyboardAvoidingView>
      );
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={Fire.send}
          user={this.user}
          scrollToBottom
          renderSend={renderSend}
          listViewProps={{
            style: {
              backgroundColor: 'black',
            },
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sendingContainer: {
    borderRadius: 20,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    shadowColor: 'red',
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.5,
    zIndex: 16,
    marginBottom: 10,
  },
});
