import React, { Component } from 'react';
import { View, Button, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';



class Camera extends Component{



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
      console.error(error);
    });
  }

  takePicture = async() => {
    if(this.camera){
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      this.sendToServer(data);
    }
  }


  render(){
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
