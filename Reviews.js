import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet } from 'react-native';
import App from './App';
import Locations from './Locations';


export default class Review extends Component {


  constructor(props){
    super(props);

    this.state = {
      isLoading: true,
      overall_rating:"",
      price_rating:"",
      quality_rating:"",
      clenliness_rating:"",
      review_body:""
    };
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }




  addReview = () => {

    let to_send = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body,

    };

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/1/review", {
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

    let to_send = {
      overall_rating: parseInt(this.state.overall_rating),
      price_rating: parseInt(this.state.price_rating),
      quality_rating: parseInt(this.state.quality_rating),
      clenliness_rating: parseInt(this.state.clenliness_rating),
      review_body: this.state.review_body,

    };

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/1/review/9", {
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

    <View style={styles.container}>
    <Text style={styles.titleText}>Add a Review:</Text>
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
     </View>

  )

}

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightcoral',
  },
  titleText:{
    fontFamily: 'Georgia',
    fontSize: 30,
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
  buttonText2:{
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
