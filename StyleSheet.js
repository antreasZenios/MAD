import { Alert, Button, Text, TouchableOpacity, TextInput, View, StyleSheet } from 'react-native';
// This is the Stylesheet of the project and it is used throughout the App
const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'lightcoral',
  },
  titleText:{
    fontFamily: 'Georgia',
    fontSize: 50,
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

  FlatListItemStyle: {
      padding: 15,
      fontSize: 25,
      height: 200,
    },
    infoText:{
      fontFamily: 'Georgia',
      fontSize: 20,
      alignItems: 'center',
      justifyContent: 'center',
      padding:20,
      height:70
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
});



export {styles}
