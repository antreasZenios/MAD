import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,FlatList,Image } from 'react-native';
import App from './App';
import Locations from './Locations';
import {styles} from "./StyleSheet";
import Camera from './camera';

export default class ReviewsDisplay extends Component {




  constructor(props){
    super(props);


 //Declaring global variables:
    global.revID="";
    global.cameraID="";
  //Declaring variables that our used in this class and can change state
    this.state = {
      isLoading: true,
      review:"",
      photo:[]
    };
  }



//when the screen is focused we call getReviews function to render and refresh Reviews flatlist
  UNSAFE_componentWillMount(){

     this.props.navigation.addListener('focus', () => {this.getReviews()})
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



//Delete request to delete a review from the database
  deleteReview= () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+revID,{
      method:'delete',
      headers:{
      'X-Authorization':key
    },
  })
  .then((response) => {
    if(response.ok){

        Alert.alert("You have deleted this review !");
        this.getReviews();
    }
    else if(response.status==400){Alert.alert("Bad Request")}
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




// Function that is triggered when an item of the flatlist is pressed and gives a user some options to interact with the review and navigate to other screens
  GetFlatListItem(item)
{
  revID=item.review_id;
  const navigation=this.props.navigation;


  Alert.alert(
    'Manage this Review',
   'You can get all the reviews regarding this location, Favourite and Unfavourite the location',
    [
      {
        text: 'Edit this review',
        onPress: () => navigation.navigate("Add or Edit a Review"),
      },
      {
        text:'Delete this review',
        onPress: () => this.deleteReview(),

      },
      {
        text:'Take a picture',
        onPress: () => navigation.navigate("Camera"),
      }
    ]
  )
}




// GET request to get the reviews and render them in a flatlist
    getReviews = () => {

      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID,{
        method:'get',
        headers:{
        'X-Authorization':key
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {

          this.setState({
              isLoading:false,
              review:responseJson.location_reviews
          })

      })

      .catch((error) => {
          console.log(error);
      });
    }


// Post request to like a review
    likeReview= (id) => {
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+id+"/like",{
        method:'post',
        headers:{
        'X-Authorization':key
      },
    })
    .then((response) => {
      if(response.ok){
          Alert.alert("You have Liked this review !");
          this.getReviews();
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


// Delete request to remove a like from a review
    unlikeReview= (id) => {
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+id+"/like",{
        method:'delete',
        headers:{
        'X-Authorization':key
      },
    })
    .then((response) => {
      if(response.ok){

          Alert.alert("You have unliked this review !");
          this.getReviews();
      }

      else if(response.status==401){Alert.alert("Unauthorised")}
      else if(response.status==403){Alert.alert("Forbidden")}
      else if(response.status==404){Alert.alert("Not Found")}
      else if(response.status==500){Alert.alert("Server Error")}


    })
      .catch((error) => {
          console.log(error);
      }
      );
    }



// Delete request to remove a photo of a review from the database
    deletePhotoReview= (id) => {
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+id+"/photo",{
        method:'delete',
        headers:{
        'X-Authorization':key,
      },
    })
    .then((response) => {
      if(response.ok){
          Alert.alert("Photo deleted !");
          this.getReviews();
      }
      else if(response.status==401){Alert.alert("Unauthorised")}
      else if(response.status==403){Alert.alert("Forbidden")}
      else if(response.status==404){Alert.alert("Not Found")}
      else if(response.status==500){Alert.alert("Server Error")}
    })
      .catch((error) => {
          console.log(error);
      }
      );
    }





render(){
  // create a loading indicator untill the get request for reviews is finished and a flatlist of reviews is rendered
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


const navigation=this.props.navigation;

  return(
//Create a view to render the reviews Flatlist which item has its own buttons for like dislike, remove photo and an image prop
    <SafeAreaView style={styles.container}>

    <Text style={styles.titleText}>
    Reviews:

    </Text>

    <FlatList


  data={ this.state.review }

  ItemSeparatorComponent = {this.FlatListItemSeparator}

  renderItem={({item}) =>
     <View>
   <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)} >
     Overall Rating :
   {item.overall_rating}    Price Rating :
   {item.price_rating}    Quality Rating :
   {item.quality_rating}  Cleanliness Rating :
   {item.clenliness_rating}  Likes:
   {item.likes}   Review :
   {item.review_body}   </Text>
   <TouchableOpacity style={styles.likeButton}
   onPress={() => this.likeReview(item.review_id) }
 >
  <Text style={styles.buttonText2}> Like </Text>

   </TouchableOpacity>
   <TouchableOpacity style={styles.likeButton}
   onPress={() =>this.unlikeReview(item.review_id) }
 >
  <Text style={styles.buttonText2}> Unlike </Text>

   </TouchableOpacity>

   <TouchableOpacity style={styles.likeButton}
   onPress={() =>this.deletePhotoReview(item.review_id) }
 >
  <Text style={styles.buttonText2}>Delete a Photo </Text>

   </TouchableOpacity>

   <View>
   <Image
   style={{width:150, height:200}}
   source={{uri:"http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+item.review_id+"/photo"}}
   />
   </View>

</View>
}
  keyExtractor={(item, index) => index.toString()}

     />
     <TouchableOpacity
       style={styles.button}
       onPress={() =>navigation.navigate("Add or Edit a Review") }
     >
      <Text style={styles.buttonText}> Add Review </Text>
     </TouchableOpacity>



    </SafeAreaView>

  )

}

}
