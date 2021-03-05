import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import SignUp from './signUp';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserProfile from './User';
import Review from './Reviews';
import Locations from './Locations';
import ReviewsDisplay from './ReviewsDisplay';
import Camera from './camera.js';


//declaring a Stack , Drawer and a BottomTab navigation
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

// Stack navigation function with 3 screens 1(Login Page)  2(SignUp page)  3(BottomTabnavigator)
function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={MyTabs} options={{ headerShown:false}} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

// Drawer navigation function that with 2 screens the Locations and the Add or Edit Reviews page
function MyDrawer(){

  return(

      <Drawer.Navigator initialRouteName="Locations">
        <Drawer.Screen name="Add or Edit a Review" component={Review} />
        <Drawer.Screen name="Locations" component={Locations} />
      </Drawer.Navigator>

  )
}


// Bottom Tab navigator with 4 Screens. 1(Drawer Navigation)  2(Reviews page)  3(Camera) 4(User Profile page)
function MyTabs() {
  return (

    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#000000"
      barStyle={{ backgroundColor: 'lightpink' }}
    >
      <Tab.Screen
        name="Feed"
        component={MyDrawer}
        options={{
          tabBarLabel: 'Locations',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={'black'} size={26} />
          ),
        }
      }

      />
      <Tab.Screen
        name="Reviews"
        component={ReviewsDisplay}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="comment" color={'black'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="camera" color={'black'} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={'black'} size={26} />
          ),
        }}
      />
    </Tab.Navigator>

  );
}


export default MyStack;
