import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import axios from 'axios';

import { Permission, PERMISSION_TYPE } from '../AppPermissions';

import ImagePicker from 'react-native-image-crop-picker';
import { ScrollView } from 'react-native-gesture-handler';

export default class PostScreen extends React.Component {
  //componentDidMount() {
  //Permission.checkPermission(PERMISSION_TYPE.photo);
  //}

  state = {
    text: '',
    userImage: '',
  };

  uploadPost = () => {
    Alert.alert(
      'This feature is not yet available.',
      'Write and link logic for uploading to ipfs',
    );
  };

  selectImage = () => {
    const images = ImagePicker.openPicker({
      mediaType: 'photo',
      width: 1920,
      height: 1080,
      cropping: true,
    })
    const data = new FormData();
    images.forEach((image, index) => {
      data.append(`file[${index}]`, {
          uri: Platform.OS === 'ios' ? `file:///${image.path}` : image.path,
          type: 'image/jpeg',
          name: 'image.jpg'
      });
  });
  axios({
      url: 'https://grem-api.herokuapp.com/api/content/upload-post',
      method: 'POST',
      data,
      headers: { 'Content-Type': 'multipart/form-data' }
  }).then((response) => {
      console.log('image upload response: ', response)
  }).catch((error) => {
      console.log('image upload error: ', error)
  });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.uploadPost}>
              <Text style={{ fontSize: 20 }}>Post</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Image
              //todo: you have to set the logic to get the dp from a json file from ipfs and then set it as source down below...
              source={require('../assets/LoginBackground.png')}
              style={styles.avatar}></Image>
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={4}
              style={{ flex: 1 }}
              placeholder="Share Something Publicly!"></TextInput>
          </View>

          <TouchableOpacity style={styles.photo} onPress={this.selectImage}>
            <Icon name="md-camera" size={32} color="#D8D9DB" />
          </TouchableOpacity>
          <View
            style={{ flex: 1, marginLeft: 32, marginRight: 32, marginTop: 32 }}>
            <Image
              source={{ uri: this.state.userImage }}
              style={{
                aspectRatio: 16 / 9,
                width: '100%',
                height: '100%',
              }}
            />
          </View>
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
