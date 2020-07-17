import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {PlatformIOSStatic, Platform} from 'react-native';

const PLATFORM_PHOTO_PERMISSIONS = {
  ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const REQUEST_PERMISSIONS_TYPE = {
  photo: PLATFORM_PHOTO_PERMISSIONS,
};

const PERMISSION_TYPE = {
  photo: 'photo',
};

class AppPermission {
  checkPermission = async (type): Promise<boolean> => {
    console.log('AppPermission checkPermission type: ', type);
    const permissions = REQUEST_PERMISSIONS_TYPE[type][Platform.OS];
    console.log('AppPermission checkPermission Permission: ', permissions);
    if (!permissions) {
      return true;
    }
    try {
      const result = await check(permissions);
      console.log('AppPermission checkPermission result: ', result);
      if (result === RESULTS.GRANTED) return true;
      return this.requestPermission(permissions); //Request Permission
    } catch (error) {
      console.log('AppPermission checkPermission error: ', error);
      return false;
    }
  };

  requestPermission = async (permissions): Promise<boolean> => {
    console.log('AppPermission checkPermission permissions: ', permissions);
    try {
      const result = await request(permissions);
      console.log('AppPermission checkPermission result: ', result);
      result === RESULTS.GRANTED;
    } catch (error) {
      console.log('AppPermission checkPermission error: ', error);
      return false;
    }
  };
}

const Permission = new AppPermission();
export {Permission, PERMISSION_TYPE};
