import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
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
      <View style={{alignItems: 'center', flex: 1, backgroundColor: 'black'}}>
        <Image
          source={require('../assets/Logo.png')}
          style={{flex: 1, width: "100%", height: "80%", marginTop: 200}}></Image>
        <ActivityIndicator size="large" style={{flex: 1, marginBottom: 300}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
