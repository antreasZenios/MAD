import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button,SafeAreaView,StyleSheet,TouchableOpacity,Alert,TextInput,ScrollView } from 'react-native';
import Login from "./Login";
import App from "./App";




class UserProfile extends Component{
  constructor(props){
    super(props);

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


  componentDidMount(){
    this.getData();
  }






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
     else {
       Alert.alert("Something went wrong")
     }
  })
    .catch((error) => {
        console.log(error);
    })

  }


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
     else {

       Alert.alert("Something went wrong")
     }
    })

    .catch((error) => {
      console.log(error);
    })
  }



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
        console.log(error);
    });
  }




  render(){

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
        <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>
        User Profile :
        </Text>

        <Text style={styles.titleText}>
      First Name :  {this.state.First_Name}           Last Name :  {this.state.Last_Name}            Email : {this.state.Email}

        </Text>

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

    </SafeAreaView>
      );
    }


  }

}

export default UserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightcoral',
  },
  titleText:{
    fontFamily: 'Georgia',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20,
    height:100
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'lightcyan',
    width: 250,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText:{
    fontFamily: 'Baskerville',
    fontSize: 25,
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
