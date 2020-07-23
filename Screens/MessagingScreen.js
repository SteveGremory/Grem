import React from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';

export default class MessagesScreen extends React.Component {
  state = { chats: [] };
  render() {
    renderChats = (chatboxes) => {
      return (
        <View style={styles.feedItem}>
          <Image source={chatboxes.avatar} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}></View>
          </View>
        </View>
      );
    };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Messages</Text>
        </View>
        <FlatList
          style={styles.feed}
          data={this.state.chat}
          renderItem={({ item }) => this.render(item)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
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
    paddingTop: 40,
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
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 8,
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    color: '#454D65',
  },
  timestamp: {
    fontSize: 11,
    color: '#C4C6CE',
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: '#838899',
  },
});
