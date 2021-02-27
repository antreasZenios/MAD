import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import App from './App';
import Dialog from "react-native-dialog";
import ReviewsDisplay from "./ReviewsDisplay";

export default class Locations extends Component {


  constructor(props){
    super(props);
global.locID="1";
    this.state = {
    isLoading:true,
    locationList:[],

    };
  }





  componentDidMount(){
    this.getLocations();

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



  GetFlatListItem (item) {
 locID=item.location_id;
const navigation=this.props.navigation;

    favouriteLoc= () => {
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+item.location_id+"/favourite",{
        method:'post',
        headers:{
        'X-Authorization':key
      },
    })
    .then((response) => {
      if(response.ok){

          Alert.alert("You have favourite this location !");
      }})
      .catch((error) => {
          console.log(error);
      }
      );
    }


    unfavouriteLoc= () => {
      return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+item.location_id+"/favourite",{
        method:'delete',
        headers:{
        'X-Authorization':key
      },
    })
    .then((response) => {
      if(response.ok){

          Alert.alert("You have unfavourite this location !");
      }
    }
  )
      .catch((error) => {
          console.log(error);
      }
      );
    }



    gotoReviews = () => {

          navigation.navigate('Reviews')


      }

    Alert.alert(
      'Manage this Location',
     'You can get all the reviews regarding this location, Favourite and Unfavourite the location',
      [
        {
          text: 'See Reviews',
          onPress: () => gotoReviews(),


        },
        {
          text: 'Favourite',
          onPress: () => favouriteLoc(),


        },
        {
          text: 'Unfavourite',
          onPress: () => unfavouriteLoc(),


        },
      ]
    );
    }





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



  const styles = StyleSheet.create({



FlatListItemStyle: {
    padding: 15,
    fontSize: 25,
    height: 200,
  },

    container: {
      flex: 2,
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
