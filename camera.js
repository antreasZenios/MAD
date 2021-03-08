import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';



class Camera extends Component{


// post request to send the photo to the server
  sendToServer = (data) => {
    const navigation=this.props.navigation;

    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+locID+"/review/"+revID+"/photo",
    {
      method: 'POST',
      headers: {
        "Content-Type": "image/jpeg",
        "X-Authorization": key
      },
      body: data
    })
    .then((response) => {
      navigation.navigate("Reviews")
    })
    .catch((error) => {
       if(error==400){Alert.alert("Bad Request")}
      else if(error==401){Alert.alert("Unauthorised")}
      else if(error==403){Alert.alert("Forbidden")}
      else if(error==404){Alert.alert("Not Found")}
      else if(error==500){Alert.alert("Server Error")}
      console.error(error);
    });
  }

// Take picture function to capture the photo
  takePicture = async() => {
    if(this.camera){
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      this.sendToServer(data);
    }
  }


  render(){
    // Camera view and a button that when is pressed the take Picture function is triggered
    return (
      <View style={{flex:1}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex:1,
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        />
        <Button title="Take Photo" onPress={() => this.takePicture()} />
      </View>
    );
  }

}

export default Camera;
