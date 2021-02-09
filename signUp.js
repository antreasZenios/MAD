import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,StyleSheet } from 'react-native';
//import {styles} from './styleSheet';
import App from './App';
import Login from './Login';





export default class SignUp extends Component {


  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      first_name:'',
      last_name:'',
    };

//const  navigation = this.props.navigation;
}


addUser = () => {
  const  navigation = this.props.navigation;
  let to_send = {
    first_name: (this.state.first_name),
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
   else {

     Alert.alert("Something went wrong")
   }
  })

  .catch((error) => {
    console.log(error);
  })
}





  render() {

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
                        //navigation.navigate('Home')

        }
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
