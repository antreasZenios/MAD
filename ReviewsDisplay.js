import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,FlatList } from 'react-native';
import App from './App';
import Locations from './Locations';


export default class ReviewsDisplay extends Component {


  constructor(props){
    super(props);
this.getReviews = this.getReviews.bind(this);
    this.state = {
      isLoading: true,
      place:"",
      review:"",
    };
  }


  componentDidMount(){
    this.getReviews();

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




render(){

this.getReviews();

  return(

    <SafeAreaView style={styles.container}>

    <Text style={styles.titleText}>
    Reviews :

    </Text>

    <FlatList


  data={ this.state.review }

  ItemSeparatorComponent = {this.FlatListItemSeparator}

  renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)} >
     Overall Rating :
   {item.overall_rating}    Price Rating :
   {item.price_rating}    Quality Rating :
   {item.quality_rating}  Clenliness Rating :
   {item.clenliness_rating}  Likes:
   {item.likes}   Review :
   {item.review_body}   </Text>

}


  keyExtractor={(item, index) => index.toString()}


     />
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
      padding: 10,
      fontSize: 18,
      height: 500,
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
