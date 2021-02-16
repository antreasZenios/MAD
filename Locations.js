import 'react-native-gesture-handler';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Text, TouchableOpacity, TextInput, View,SafeAreaView,ScrollView,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import App from './App';
import Dialog from "react-native-dialog";


export default class Locations extends Component {


  constructor(props){
    super(props);

    this.state = {
      isLoading:true,
    locationList:[],
    reviews:[]
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

    Alert.alert(JSON.stringify(item.location_id));

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
        reviews = responseJson.location_reviews
        this.setState({
            isLoading:false,
            reviews : responseJson.location_reviews,
            locationList: responseJson
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
            <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>
            Locations :
            </Text>

            <FlatList


          data={ this.state.locationList }

          ItemSeparatorComponent = {this.FlatListItemSeparator}

          renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)} >
           {item.location_name} {item.location_town} Overall Rating :
           {item.avg_overall_rating}    Price Rating:
           {item.avg_price_rating}    Quality Rating :
           {item.avg_quality_rating}  Clenliness Rating:
           {item.avg_clenliness_rating}   </Text>}

          keyExtractor={(item, index) => index.toString()}

             />
              </SafeAreaView>

        );
      }
    }

  }



  const styles = StyleSheet.create({

MainContainer :{

justifyContent: 'center',
flex:1,
margin: 10,
paddingTop: (Platform.OS === 'ios') ? 20 : 0,

},

FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 100,
  },

    container: {
      flex: 2,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      backgroundColor: 'lightcoral',

    },
    titleText:{
      fontFamily: 'Georgia',
      fontSize: 20,
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
