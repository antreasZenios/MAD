import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,StyleSheet } from 'react-native';
import App from './App';
import Login from './Login';
import {styles} from "./StyleSheet";




export default class SignUp extends Component {


  constructor(props){
    super(props);

//Declaring variables that our used in this class and can change state
    this.state = {
      email: '',
      password: '',
      first_name:'',
      last_name:'',
    };
}


// POST request to add a new user to the database
addUser = () => {
  const  navigation = this.props.navigation;
  let to_send = {
    first_name: this.state.first_name,
    last_name: this.state.last_name,
    email: this.state.email,
    password: this.state.password,

  };

  return fetch("http://10.0.2.2:3333/api/1.0.0/user", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(to_send)
  })
  .then((response) => {
    if(response.ok){
    Alert.alert("Account created! Use your credentials to login.");
    navigation.navigate("Login")
   }
   else if(response.status==400){Alert.alert("Bad request")}
   else if(response.status==500){Alert.alert("Server error")}
  

  })

  .catch((error) => {
    console.log(error);
  })
}





  render() {
//Create a view with text inputs of email and password first name and last name  and a button to send the request and create the new user
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
          value={this.state.first_name}
          keyboardType = 'default'
          onChangeText={(first_name) => this.setState({ first_name})}
          placeholder='Name'
          placeholderTextColor = 'black'
          style={styles.input}
        />
        <TextInput
          value={this.state.last_name}
          keyboardType = 'default'
          onChangeText={(last_name) => this.setState({ last_name })}
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
          onPress={() =>this.addUser()

        }
       >
         <Text style={styles.buttonText}> Sign Up </Text>
       </TouchableOpacity>

      </View>

      </>
    );
  }
}
