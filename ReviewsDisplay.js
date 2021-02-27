import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,FlatList } from 'react-native';
import App from './App';
import Locations from './Locations';


export default class ReviewsDisplay extends Component {




  constructor(props){
    super(props);


    global.revID="";
    this.state = {
      isLoading: true,
      review:"",
    };
  }



  componentDidMount(){
    this.getReviews();
  }
  UNSAFE_componentWillMount(){
    this.getReviews();
     this.props.navigation.addListener('focus', () => {this.getReviews()})
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
  revID=item.review_id;
  const navigation=this.props.navigation;


  deleteReview= () => {
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+item.review_id,{
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
  }

)
    .catch((error) => {
        console.log(error);
    }
    );
  }



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
        onPress: () => deleteReview(),

      },
      {
        text:'Cancel'
      }
    ]
  )
}





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
              place: responseJson.location_name,
              review:responseJson.location_reviews
          })

      })

      .catch((error) => {
          console.log(error);
      });
    }

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
      }})
      .catch((error) => {
          console.log(error);
      }
      );
    }

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
      }})
      .catch((error) => {
          console.log(error);
      }
      );
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


const navigation=this.props.navigation;

  return(

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
   {item.quality_rating}  Clenliness Rating :
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


const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightcoral',
  },
  FlatListItemStyle: {
      padding: 15,
      fontSize: 25,
      height: 200,
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
  likeButton: {
    alignItems: 'center',
    backgroundColor: 'lightcyan',
    width: 150,
    height: 30,
    padding: 5,
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
    fontSize: 20,
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
