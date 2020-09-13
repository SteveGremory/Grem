import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
} from 'react-native';
import firebase from 'firebase';
import userInfo from '../user.js';

function uploadUserID() {
  let userID = firebase.auth().currentUser.uid;
}

export default class ProfileScreen extends React.Component {
  state = userInfo;

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
          <View style={{ marginTop: 64, alignItems: 'center' }}>
            <View style={styles.avatarContainer}>
              <Image
                source={
                  this.state.userAvatar
                    ? this.state.userAvatar
                    : require('../assets/tempAvatar.jpg')
                }
                style={styles.avatar}
              />
            </View>
            <Text style={styles.name}>{this.state.userRealName}</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>{this.state.userPosts}</Text>
              <Text style={styles.statTitle}>POSTS</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>{this.state.userFollowers}</Text>
              <Text style={styles.statTitle}>FOLLOWERS</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statAmount}>{this.state.userFollowing}</Text>
              <Text style={styles.statTitle}>FOLLOWING</Text>
            </View>
          </View>
          <ScrollView style={{ backgroundColor: 'black' }}>
            <Button
              onPress={() => {
                firebase.auth().signOut();
              }}
              title="Log out"
            />
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  profile: {
    marginTop: 64,
    alignItems: 'center',
  },
  avatarContainer: {
    shadowColor: 'red',
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
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 32,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statAmount: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
  statTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});
