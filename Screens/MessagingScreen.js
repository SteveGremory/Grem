import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import user from '../user.js';

export default class MessagesScreen extends React.Component {
  state = {
    chats: [
      {
        userName: 'GLOBAL',
        id: 1,
      },
    ],
    userInfo: user,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        <FlatList
          style={{
            backgroundColor: 'black',
            borderRadius: 5,
            padding: 8,
            flexDirection: 'column',
            marginVertical: 8,
          }}
          data={this.state.chats}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                style={styles.chatbox}
                onPress={() => this.props.navigation.navigate('Chat')}>
                <Text style={styles.name}>{item.userName}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
    flexDirection: 'column',
  },
  name: {
    fontSize: 32,
    fontWeight: '500',
    color: '#454D65',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  chatbox: {
    backgroundColor: 'white',
    marginHorizontal: 18,
    marginTop: 18,
    height: 54,
    borderRadius: 32,
  },
});
