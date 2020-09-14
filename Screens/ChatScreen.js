import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  SafeAreaView,
  View, 
  Text, 
  TouchableOpacity,
  Image
} from 'react-native';
import { GiftedChat, Send, InputToolbar, renderInputToolbar, Actions } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Fire from '../Fire';
import ImagePicker from 'react-native-image-crop-picker'
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
    const renderInputToolbar = (props) => (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: 'white',
          borderRadius: 30,
        }}
        primaryStyle={{ alignItems: 'center', justifyContent: "center" }}
      />
    );

    const renderSend = (props) => (
      <Send
        {...props}
        containerStyle={{
          
        }}
      >
        <Icon name="ios-arrow-forward" style={{borderRadius: 20, borderColor: "red"}} size={40} color="black"></Icon>
      </Send>
    );

    const selectImage = () => {
      ImagePicker.openPicker({
        width: 1920,
        height: 1080,
        cropping: true,
      }).then((image) => {
        console.log(image);
        this.setState({ userImage: image.data });
      });
    };

    const renderActions = (props) => (
      <Actions
        {...props}
        containerStyle={{
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 4,
          marginRight: 4,
          marginBottom: 0,
        }}
        options={{
          ['Send Image']: selectImage,
        }}
        icon={() => (
          <Icon name="ios-add" size={20} color="black"></Icon>
        )}
        onSend={console.log()} //add logic here you idiot..TODO
        optionTintColor="White"
      />
    );

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
            <View style={styles.header}>

              <TouchableOpacity onPress={() => this.props.navigation.navigate("App")}>
                <Icon style={styles.back} name="ios-arrow-back" size={32} color="white"></Icon>
              </TouchableOpacity>

              <Text style={styles.headerTitle}>{firebase.auth().currentUser.displayName}</Text>

            </View>
            <GiftedChat
                renderSend={renderSend}
                renderInputToolbar={renderInputToolbar}
                messages={this.state.messages}
                onSend={Fire.send}
                user={this.user}
                scrollToBottom
                renderActions={renderActions}
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
    flexDirection: "row",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'red',
    textAlign: "center",
  },
  sendArrow: {
    backgroundColor: "black",
    borderRadius: 20,
  },
  back: {
    backgroundColor: "black",
    marginLeft: -80,
    borderRadius: 20,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'red',
  },
});