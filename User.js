import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button,SafeAreaView,StyleSheet,TouchableOpacity,Alert,TextInput,ScrollView } from 'react-native';
import Login from "./Login";
import App from "./App";
import {styles} from "./StyleSheet";



class UserProfile extends Component{
  constructor(props){
    super(props);
//Declaring variables that our used in this class and can change state
    this.state = {
      isLoading: true,
      userInfo:[],
      email:"",
      first_name:"",
      last_name:"",
      password:"",
      First_Name:"",
      Last_Name:"",
      Email:""
    };
  }

//call getData function as soon as the screen opens and for refresh purpose
  componentDidMount(){
    this.getData();
  }





// Post request to logout a user
  userLogout = () => {
   const  navigation = this.props.navigation;
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout",{
      method:'post',
      headers:{
      'X-Authorization':key
    },
  })
    .then((response) => {
      if(response.ok){
      Alert.alert("You have successfuly logged out");
      navigation.navigate("Login")
     }
     else if (response.status==401) { Alert.alert("Unauthorised") }
     else if (response.status==500) { Alert.alert("Server Error") }
  })
    .catch((error) => {
        console.log(error);
    })

  }

//Patch request to change the user Details
  updateUser = () => {
    const  navigation = this.props.navigation;
    let to_send = {
      first_name: (this.state.first_name),
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,

    };

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization':key

      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if(response.ok){
        this.getData();
      Alert.alert("Account updated!");
     }

     else if(response.status==400){Alert.alert("Bad Request")}
     else if(response.status==401){Alert.alert("Unauthorised")}
     else if(response.status==403){Alert.alert("Forbidden")}
     else if(response.status==404){Alert.alert("Not Found")}
     else if(response.status==500){Alert.alert("Server Error")}
    })

    .catch((error) => {
      console.log(error);
    })
  }


//get request to get all the user's data
  getData = () => {

    return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id,{
      method:'get',
      headers:{
      'X-Authorization':key
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {

        this.setState({
            isLoading: false,
            userInfo: responseJson,
            First_Name:responseJson.first_name,
            Last_Name:responseJson.last_name,
            Email:responseJson.email
        })
    })

    .catch((error) => {
      if(error==401){Alert.alert("Unauthorised")}
      else if(error==404){Alert.alert("Not Found")}
      else if(error==500){Alert.alert("Server Error")}
        console.log(error);
    });
  }
//



  render(){
// create a loading indicator untill the get request for user's details is finished and info are rendered
    if(this.state.isLoading){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            size="large"
            color="#000000"
          />
        </View>
      );
    }
    else{
      return (
        // create a view that shows the user's details and input buttons to change any details of the user as well as logout
        <SafeAreaView style={styles.container}>
        <ScrollView>
        <Text style={styles.titleText}>
        User Profile :
        </Text>

          <Text style={styles.infoText}>First Name :  {this.state.First_Name}</Text>
          <Text style={styles.infoText}>Last Name :  {this.state.Last_Name}</Text>
          <Text style={styles.infoText}>Email : {this.state.Email}</Text>




    <TouchableOpacity
      style={styles.button}
      onPress={() => this.userLogout() }
   >
     <Text style={styles.buttonText}> Logout </Text>
    </TouchableOpacity>


    <Text style={styles.titleText}>Update your Info :</Text>
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
        onPress={() =>this.updateUser()

      }
     >
       <Text style={styles.buttonText}> Update </Text>
     </TouchableOpacity>
</ScrollView>
    </SafeAreaView>
      );
    }


  }

}

export default UserProfile;
