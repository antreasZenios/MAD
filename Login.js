import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
import App from './App';
import SignUp from './signUp';
import {styles} from "./StyleSheet";



export default class Login extends Component {

  constructor(props){
    super(props);
    //Declaring global variables:
    global.key = "";
    global.id = "";

    //Declaring variables that our used in this class and can change state
    this.state = {
      email: '',
      password: '',
    };
}


//POST request to login a user based on Email and password authentication
    loginUser = () => {
      const navigation=this.props.navigation;
      let to_send = {

        email: this.state.email,
        password: this.state.password,

      };

      return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(to_send)
      })
      .then((response) => response.json())
      .then((responseJson) => {

// Save authentication token and User id from Json response for future use
          key = responseJson.token;
          id = responseJson.id;

         navigation.navigate('Home')
      })
      .catch((error) => {
        console.log(error);
      })
    }





  render() {
    const navigation= this.props.navigation;
    return (

//Create a view with text inputs of email and password that has 2 buttons one for log in and one for navigation to signup page

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
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor = 'black'
          style={styles.input}
        />


        <TouchableOpacity
          style={styles.button}
          onPress={() => this.loginUser() }
       >
         <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUp')}
       >
         <Text style={styles.buttonText2}> Don't have an account? </Text>
        </TouchableOpacity>
         </View>


    );
  }
}
