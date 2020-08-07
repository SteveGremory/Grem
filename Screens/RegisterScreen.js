import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import * as firebase from 'firebase';

export class RegisterScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    name: '',
    email: '',
    password: '',
    ipfsHash: '',
    username: '',
    errorMessage: null,
  };

  handleSignUp = async () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <SafeAreaView>
            <Image
              source={require('../assets/Logo.png')}
              style={{
                width: '100%',
                height: '50%',
              }}></Image>

            <TouchableOpacity
              style={styles.back}
              onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" size={32} color="white"></Icon>
            </TouchableOpacity>

            <View style={styles.form}>
              <View>
                <Text style={styles.inputTitle}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(name) => this.setState({ name })}
                  value={this.state.name}></TextInput>
              </View>
              <View style={{ marginTop: 32 }}>
                <Text style={styles.inputTitle}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={(email) => this.setState({ email })}
                  value={this.state.email}></TextInput>
              </View>
              <View style={{ marginTop: 32 }}>
                <Text style={styles.inputTitle}>Password</Text>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({ password })}
                  value={this.state.password}></TextInput>
              </View>
            </View>
            <View
              style={
                (styles.errorMessage, { marginTop: -10, marginBottom: 30 })
              }>
              {this.state.errorMessage && (
                <Text style={styles.error}>{this.state.errorMessage}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignSelf: 'center', marginTop: 28, flex: 1 }}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text
                style={{ color: '#414959', fontSize: 14, borderRadius: 10 }}>
                Been Here Before?
                <Text style={{ fontWeight: '500', color: '#E9446A' }}>
                  Log In!
                </Text>
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
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
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: '#E9446A',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    marginHorizontal: 30,
    marginBottom: 24,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: 'white',
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: 'magenta',
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 25,
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default RegisterScreen;
