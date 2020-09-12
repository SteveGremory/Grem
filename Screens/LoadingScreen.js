import React from 'react';
import {
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
      <View style={{ alignItems: 'center', flex: 1, backgroundColor: 'black' }}>
        <Image
          source={require('../assets/Logo.png')}
          style={{ width: '100%', height: '50%' }} />
        <ActivityIndicator style={{ flex: 1, marginBottom: 300 }} />
      </View>
    );
  }
}
