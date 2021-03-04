import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,FlatList } from 'react-native';
import App from './App';
import Locations from './Locations';
import {styles} from "./StyleSheet";

export default class Review extends Component {


  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:"",
      reviews:[],
      item:""
    };
  }




  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem(item)
{
  Alert.alert("WOW")
}



  addReview = () => {

const navigation=this.props.navigation;
    let to_send = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body,

    };

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization':key

      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if(response.ok){

      Alert.alert("Review posted!");
      navigation.navigate("Reviews");
     }
     else {
       Alert.alert("Something went wrong")
     }
    })

    .catch((error) => {
      console.log(error);
    })
  }






  editReview = () => {
   const navigation=this.props.navigation;
    let to_send = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body,

    };

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+revID, {
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization':key

      },
      body: JSON.stringify(to_send)
    })
    .then((response) => {
      if(response.ok){

      Alert.alert("Review updated!");
        navigation.navigate("Reviews");

    }
     else {
       Alert.alert("Something went wrong")
     }
    })

    .catch((error) => {
      console.log(error);
    })
  }










render(){


  return(

    <SafeAreaView style={styles.container}>

    <Text style={styles.titleText}>Add or Edit a Review:</Text>
      <TextInput
        value={this.state.overall_rating}
        keyboardType = 'number-pad'
        onChangeText={(overall_rating) => this.setState({ overall_rating })}
        placeholder='Overall Rating'
        placeholderTextColor = 'black'
        style={styles.input}
      />
      <TextInput
        value={this.state.price_rating}
        keyboardType = 'number-pad'
        onChangeText={(price_rating) => this.setState({ price_rating})}
        placeholder='Price Rating'
        placeholderTextColor = 'black'
        style={styles.input}
      />
      <TextInput
        value={this.state.quality_rating}
        keyboardType = 'number-pad'
        onChangeText={(quality_rating) => this.setState({ quality_rating })}
        placeholder='Quality Rating'
        placeholderTextColor = 'black'
        style={styles.input}
      />
      <TextInput
        value={this.state.clenliness_rating}
        keyboardType = 'number-pad'
        onChangeText={(clenliness_rating) => this.setState({ clenliness_rating })}
        placeholder='Cleanliness Rating'
        placeholderTextColor = 'black'
        style={styles.input}
      />
      <TextInput
        value={this.state.review_body}
        onChangeText={(review_body) => this.setState({ review_body })}
        placeholder={'Review'}
        placeholderTextColor = 'black'
        style={styles.input}
      />


      <TouchableOpacity
        style={styles.button}
        onPress={() =>this.addReview() }
     >
       <Text style={styles.buttonText}> Add Review </Text>
     </TouchableOpacity>
     <TouchableOpacity
       style={styles.button}
       onPress={() =>this.editReview() }
    >
      <Text style={styles.buttonText}> Edit Review </Text>
    </TouchableOpacity>


    </SafeAreaView>


  )

}

}
