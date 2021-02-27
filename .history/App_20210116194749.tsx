//Import Necessciary Packages.
import React from "react";
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import "react-native-gesture-handler";
//Import Screens
import RegisterScreen from "./Screens/RegisterScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import TrendingScreen from "./Screens/TrendingScreen";
import MessagingScreen from "./Screens/MessagingScreen";
import PostScreen from "./Screens/PostScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import OtherProfile from "./Screens/OtherProfile";
import CommentScreen from "./Screens/CommentScreen";
import ChatScreen from "./Screens/ChatScreen";


const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-home" size={24} color={tintColor} />
            ),
          },
        },
        Messages: {
          screen: MessagingScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-chatbox-ellipses" size={24} color={tintColor} />
            ),
          },
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon
                name="ios-add-circle"
                size={50}
                color={"red"}
                style={{
                  ...Platform.select({
                    ios: {
                      shadowColor: "#E9446A",
                      shadowOffset: { width: 5, height: 10 },
                      shadowRadius: 10,
                      shadowOpacity: 0.5,
                    },
                    android: {
                      borderColor: "rgba(0,0,0,0)",
                      borderWidth: 1,
                      borderRadius: 100,
                      elevation: 18,
                    },
                  }),
                }}
              />
            ),
          },
        },
        Notification: {
          screen: TrendingScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="md-trending-up" size={24} color={tintColor} />
            ),
          },
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name="ios-person" size={24} color={tintColor} />
            ),
          },
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({ navigation, defaultHandler }) => {
            if (navigation.state.key === "Post") {
              navigation.navigate("postModal");
            } else {
              defaultHandler();
            }
          },
        },
        tabBarOptions: {
          activeTintColor: "red",
          inactiveTintColor: "black",
          showLabel: false,
        },
      }
    ),
    postModal: {
      screen: PostScreen,
    },
    commentModal: {
      screen: CommentScreen,
    },
  },
  {
    mode: "modal",
    headerMode: "none",
    //initialRouteName: 'postModal',
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack,
      Chat: ChatScreen,
      Messages: MessagingScreen,
      OtherProfile: OtherProfile,
      Trending: TrendingScreen,
      Comments: CommentScreen,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
