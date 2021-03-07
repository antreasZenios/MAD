import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import App from './App';
import Dialog from "react-native-dialog";
import ReviewsDisplay from "./ReviewsDisplay";
import {styles} from "./StyleSheet";


export default class Locations extends Component {



  constructor(props){
    super(props);
     //Declaring global variables:
    global.locID="1";
    //Declaring variables that our used in this class and can change state
    this.state = {
    isLoading:true,
    locationList:[],

    };
  }


//call getLocations function as soon as the screen opens and for refresh purpose
  componentDidMount(){
    this.getLocations();

  }

// Create a separator to be used in FlatList
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



//Post request to favourite a Location
  favouriteLoc= () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/favourite",{
      method:'post',
      headers:{
      'X-Authorization':key
    },
  })
  .then((response) => {
    if(response.ok){

        Alert.alert("You have favourite this location !");
    }

    else if(response.status==400){Alert.alert("Bad Request")}
    else if(response.status==401){Alert.alert("Unauthorised")}
    else if(response.status==404){Alert.alert("Not Found")}
    else if(response.status==500){Alert.alert("Server Error")}

  })
    .catch((error) => {
        console.log(error);
    }
    );
  }



// Delete request to unfavourite a location
  unfavouriteLoc= () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/favourite",{
      method:'delete',
      headers:{
      'X-Authorization':key
    },
  })
  .then((response) => {
    if(response.ok){

        Alert.alert("You have unfavourite this location !");
    }
  
    else if(response.status==401){Alert.alert("Unauthorised")}
    else if(response.status==403){Alert.alert("Forbidden")}
    else if(response.status==404){Alert.alert("Not Found")}
    else if(response.status==500){Alert.alert("Server Error")}

  }
)
    .catch((error) => {
        console.log(error);
    }
    );
  }


//Function to navigate to Reviews screen so that the user can add and edit a review
  gotoReviews = () => {

        const navigation=this.props.navigation;
        navigation.navigate('Reviews')


    }



// Function that is triggered when an item of the flatlist is pressed and gives a user some options
  GetFlatListItem (item) {
 locID=item.location_id;




    Alert.alert(
      'Manage this Location',
     'You can get all the reviews regarding this location, Favourite and Unfavourite the location',
      [
        {
          text: 'See Reviews',
          onPress: () => this.gotoReviews(),


        },
        {
          text: 'Favourite',
          onPress: () => this.favouriteLoc(),


        },
        {
          text: 'Unfavourite',
          onPress: () => this.unfavouriteLoc(),


        },
      ]
    );
    }




// Get request to get all the locations and then render them in a flatlist
  getLocations = () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/find",{
      method:'get',
      headers:{
      'X-Authorization':key
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {

        this.setState({
            isLoading:false,
            locationList: responseJson,

        })



    })

    .catch((error) => {
        console.log(error);
    });
  }



  render(){
    // create a loading indicator untill the get request for Locations is finished and flatlist is rendered
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
          // create a View where the locations are available through a flatlist for edit and interaction
            <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>
            Locations :

            </Text>

            <FlatList


          data={ this.state.locationList  }

          ItemSeparatorComponent = {this.FlatListItemSeparator}

          renderItem={({item}) =>
           <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)}> Name: {item.location_name}
           <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)}> Town : {item.location_town} </Text>
           <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)}> Overall Rating : {item.avg_overall_rating} </Text>
           <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)}> Price Rating: {item.avg_price_rating}  </Text>
           <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)}> Quality Rating : {item.avg_quality_rating}  </Text>
           <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)}> Clenliness Rating : {item.avg_clenliness_rating}   </Text>
           </Text>
         }

          keyExtractor={(item, index) => index.toString()}

/>
              </SafeAreaView>

        );
      }
    }

  }
