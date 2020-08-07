import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  LayoutAnimation,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import * as firebase from 'firebase';

export class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };
  state = {
    email: '',
    password: '',
    errorMessage: null,
  };
  //Login Handler
  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };
  render() {
    return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content"></StatusBar>
          <Image
            source={require('../assets/Logo.png')}
            style={{
              width: '100%',
              height: '50%',
            }}></Image>

          <View style={styles.form}>
            <View>
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
            style={(styles.errorMessage, { marginTop: -10, marginBottom: 32 })}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: 'white', fontWeight: '500' }}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              alignSelf: 'center',
              marginTop: 32,
            }}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{ color: '#414959', fontSize: 14 }}>
              New To Grem?
              <Text style={{ fontWeight: '500', color: '#E9446A' }}>
                Join the revolution!
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  greeting: {
    marginTop: 32,
    marginBottom: -40,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
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
    marginTop: -10,
    marginBottom: 48,
    marginHorizontal: 30,
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
});
export default LoginScreen;
