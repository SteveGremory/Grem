import React from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{flex: 1, backgroundColor: "black"}}>
        <View style={styles.container}>
            <Image
              source={require('../assets/Logo.png')}
              style={{
                width: '100%',
                height: '50%',
                marginTop: -22,
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
                (styles.errorMessage)
              }>
              {this.state.errorMessage && (
                <Text style={styles.error}>{this.state.errorMessage}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
              <Text style={{ color: 'white', fontWeight: '500' }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginTop: -18,
    marginBottom: -12,
    marginHorizontal: 32,
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
    marginTop: -18
  },
  back: {
    position: "absolute",
    top: 32,
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
