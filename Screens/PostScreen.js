import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import {Permission, PERMISSION_TYPE} from '../AppPermissions';

import ImagePicker from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

export default class PostScreen extends React.Component {
  componentDidMount() {
    Permission.checkPermission(PERMISSION_TYPE.photo);
  }

  state = {
    text: '',
    image: '',
  };

  selectImage = async () => {
    ImagePicker.showImagePicker(
      {noData: true, mediaType: 'photo'},
      (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // You can also display the image using data:
          // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            image: response.uri,
          });
        }
      },
    );
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="md-arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{fontSize: 20}}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require('../assets/LoginBackground.png')}
              style={styles.avatar}></Image>
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={4}
              style={{flex: 1}}
              placeholder="Share Something Publicly!"></TextInput>
          </View>

          <TouchableOpacity style={styles.photo} onPress={this.selectImage}>
            <Icon name="md-camera" size={32} color="#D8D9DB" />
          </TouchableOpacity>
          <Image
            source={{uri: this.state.image}}
            style={{
              width: 1024,
              height: 1024,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D8D9DB',
  },
  inputContainer: {
    margin: 32,
    flexDirection: 'row',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});
