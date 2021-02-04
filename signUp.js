import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
//import {styles} from './styleSheet';
import App from './App';
import Login from './Login';
import { createStackNavigator } from '@react-navigation/stack';




export default class SignUp extends Component {

  constructor(props){
      super(props);

//this.navigation=this.navigation.bind(this);

}


    state = {
      email: '',
      password: '',
      Name:'',
      Surname:'',
    };


  onLogin() {
    const { email, password } = this.state;

    Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  }

  render() {
const  navigation = this.props.navigation;
    return (
      <>
      <View style={styles.container}>
      <Text style={styles.titleText}>Welcome !</Text>
        <TextInput
          value={this.state.email}
          keyboardType = 'email-address'
          onChangeText={(email) => this.setState({ email })}
          placeholder='Email'
          placeholderTextColor = 'black'
          style={styles.input}
        />
        <TextInput
          value={this.state.Name}
          keyboardType = 'default'
          onChangeText={(Name) => this.setState({ Name })}
          placeholder='Name'
          placeholderTextColor = 'black'
          style={styles.input}
        />
        <TextInput
          value={this.state.Surname}
          keyboardType = 'default'
          onChangeText={(Surname) => this.setState({ Surname })}
          placeholder='Surname'
          placeholderTextColor = 'black'
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor = 'black'
          style={styles.input}
        />


        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('App')}
       >
         <Text style={styles.buttonText}> Sign Up </Text>
       </TouchableOpacity>

      </View>

      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightcoral',
  },
  titleText:{
    fontFamily: 'Georgia',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightcyan',
    width: 300,
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText:{
    fontFamily: 'Baskerville',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 300,
    fontFamily: 'Baskerville',
    fontSize: 20,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
  },
});
