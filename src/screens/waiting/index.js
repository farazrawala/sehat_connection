import React, { Component, useEffect,useState } from 'react'
import { connect } from "react-redux";
import Services from "../../apis/services";
import { Text, StyleSheet, View,Image ,ActivityIndicator} from 'react-native'
import { Constants, Utils } from "../../utils";


export default function Waiting({ navigation,route }) {



  const doctrDetail = route.params.response.data.detail.data || JSON.parse(route.params.data.detail).data;
  const userData = route.params.userData;
  const [seconds, setSeconds] = useState(60);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds(seconds => seconds + 1);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);


  useEffect(() => {
    // const interval = setInterval(() => {
    //   setSeconds(seconds => seconds - 1);
    // }, 1000);
    // if(seconds < 1)
    // {
    //   // console.log('Timeout ');
    //   Utils.showToastMessage("Patient is out of reach. Please try again later.");
    //   clearInterval(interval)
    //   navigation.navigate("App", {
    //     // screen: "Welcome",
    //     initial: false,
    //   });
    // }
    // return () => clearInterval(interval);

  }, [])

  var userImage = "";
  if (doctrDetail[0].signup_gendar == "male")
    userImage = Constants.imgBaseUrl + "avatar_male.jpeg";
  else if (doctrDetail[0].signup_gendar == "female")
    userImage = Constants.imgBaseUrl + "avatar_female.jpeg";



  return (
    <View>
          
          <View style={{height:'70%',width:'100%', paddingHorizontal:20,alignItems:'center', justifyContent: 'center'}}>
            <Image
              style={{ width: 150, height: 150, resizeMode: "contain", borderRadius:75 , marginTop: 90}}
              source={{
                uri: userImage,
                
              }}
            />

              <Text style={{fontSize:15,marginVertical:120,}}>Please wait while patient is accepting call.</Text>
            
            </View>

            <View style={{width:'100%',height:120,alignItems:'center',justifyContent: 'center'}}>

              <ActivityIndicator color={Constants.Colors.primaryBlue} size="large" /> 

              <Text style={{ fontSize:20,}} >{seconds} Seconds Left</Text>
            
            </View> 
    </View>
  )
}