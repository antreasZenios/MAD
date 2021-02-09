import React, { Component } from 'react';
import { View, Text, ActivityIndicator, FlatList, Button,SafeAreaView } from 'react-native';
import Login from "./Login";
class Get extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      userInfo: [],
    };
  }


  componentDidMount(){
    this.getData();
  }

  getData = () => {
    console.log("getting data...");
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/"+id,{
      method:'get',
      headers:{
      'X-Authorization':key
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson);
        this.setState({
            isLoading: false,
            userInfo: responseJson
        })
    })
    .catch((error) => {
        console.log(error);
    });
  }


  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator
            size="large"
            color="#00ff00"
          />
        </View>
      );
    }
    else{
      return (
        <View data ={ this.state.userInfo }
    renderItem={({item}) => <Text > {item.temp.out.c} </Text>}
    keyExtractor={(item, index) => index}/>

      );
    }
  }
}

export default Get;
