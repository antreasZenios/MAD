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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

function MyDrawer(){

  return(

      <Drawer.Navigator initialRouteName="Locations">
        <Drawer.Screen name="Add or Edit a Review" component={Review} />
        <Drawer.Screen name="Locations" component={Locations} />
      </Drawer.Navigator>

  )
}



function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}

const Tab = createMaterialBottomTabNavigator();

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
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ReviewsDisplay}
        options={{
          tabBarLabel: 'Reviews',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="comment" color={'black'} size={26} />
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
