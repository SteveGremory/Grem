import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  View, Text, TouchableOpacity
} from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
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
      name: firebase.auth().currentUser.email,
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
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.back}>
              <Icon name="ios-arrow-back" size={32} color="white"></Icon>
            </TouchableOpacity>
          </Send>
      );
    };
    if (Platform.OS === 'android') {
      return (
          <KeyboardAvoidingView
              style={{ flex: 1, backgroundColor: 'black' }}
              keyboardVerticalOffset={30}
              enabled>
            {this.chat}
          </KeyboardAvoidingView>
      );
    }

    return (
          <View style={{ flex: 1, backgroundColor: 'black' }}>
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
                }}/>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  sendingContainer: {
    borderRadius: 24,
    backgroundColor: 'rgba(21, 22, 42, 0.2)',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'red',
  },
  back: {
    borderRadius: 20,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});