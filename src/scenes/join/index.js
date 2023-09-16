import { RTCView, mediaDevices } from "@videosdk.live/react-native-sdk";
import React, { useState, useRef,useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  BackHandler,Image,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { MicOff, MicOn, VideoOff, VideoOn } from "../../assets/icons";
import TextInputContainer from "../../components/TextInputContainer";
import Button from "../../components/Button";
import colors from "../../styles/colors";
import { createMeeting, getToken, validateMeeting } from "../../api/api";
import { SCREEN_NAMES } from "../../navigators/screenNames";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-simple-toast";
import Menu from "../../components/Menu";
import MenuItem from "../meeting/Components/MenuItem";
import { ROBOTO_FONTS } from "../../styles/fonts";
import { Constants, Utils } from "../../utils";
import styles from "../../components/header/styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Spinner } from "../../components/spinner";
import { CallingSound } from "../../components/callingSound";
import Services from "../../apis/services";

export default function Join({ navigation,route }) {


  const [acceptance, setAcceptamce] = useState(false);
  const [tracks, setTrack] = useState("");
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("User");
  const [seconds, setSeconds] = useState(60);
  const [idValue, setIdValue] = useState("7gf0-xwmk-n0pn");
  const [meetingId, setMeetingId] = useState("7gf0-xwmk-n0pn");
  
  const doctrDetail = JSON.parse(route.params.response.data.detail).data || route.params.response.data.detail?.data;
  const userData = route.params.userData;

  useEffect(() => {

    if(userData.signup_type != 1)
    {
      const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      if(seconds < 1)
      {
        console.log('Timeout ');
        clearInterval(interval)
      }

      return () => clearInterval(interval);
    }
    else if(userData.signup_type == 1)
    {
      doctorEnters(true);
      console.log('doctor_enters',userData);

    }
   
  }, [])

  // useEffect(() =>{

  //   if(userData.signup_type == 1)
  //   {
  //     acceptanceOnPress(true);
  //     console.log('doctor_enters',userData);

  //   }
  //   else{
  //     console.log('patient_enters',userData);
  //   }
   

  //   console.log('consolejoinworks',userData);


  // },[])

  // console.log('Join_props__',JSON.parse(route.params.data.detail).data);
  const meetingTypes = [
    { key: "ONE_TO_ONE", value: "One to One Meeting" },
    { key: "GROUP", value: "Group Meeting" },
  ];

  const [meetingType, setMeetingType] = useState(meetingTypes[0]);

  const [isVisibleCreateMeetingContainer, setisVisibleCreateMeetingContainer] =
    useState(false);
  const [isVisibleJoinMeetingContainer, setisVisibleJoinMeetingContainer] =
    useState(true);

  const disposeVideoTrack = () => {
    setTrack((stream) => {
      stream.getTracks().forEach((track) => {
        track.enabled = false;
        return track;
      });
    });
  };


  const doctorEnters = async (webcam) => {

        
      const token = await getToken();
      let valid = await validateMeeting({
        token: token,
        meetingId: meetingId.trim(),
      });
      if (valid) {
        disposeVideoTrack();
        navigation.navigate(SCREEN_NAMES.Meeting, {
          name: name.trim(),
          token: token,
          meetingId: meetingId.trim(),
          micEnabled: micOn,
          webcamEnabled: webcam,
          meetingType: meetingType.key,
        });
      }
  }
  
  
  const cancelOnPress = async (webcam) => {

    var payload = new FormData();
    payload.append('from', userData.signup_id);
    payload.append('to', doctrDetail.signup_id);
    payload.append('consultation_id', doctrDetail.consultation_id);
    // payload.append('room_id', '7gf0-xwmk-n0pn');
    payload.append('initiate', 1);

    console.log('call_rejected_payload', payload);
    Services.post('call_rejected', {}, payload, true)
      .then(responseJson => {
        

        var response = responseJson.arr;
        console.log('call_rejected', response);

        
      })
      .catch(error => {
        console.log('_error', error);
        this.setState({
          loading: false,
        });
      });

}



  const acceptanceOnPress = async (webcam) => {

      var payload = new FormData();
      payload.append('from', userData.signup_id);
      payload.append('to', doctrDetail.signup_id);
      payload.append('consultation_id', doctrDetail.consultation_id);
      // payload.append('room_id', '7gf0-xwmk-n0pn');
      payload.append('initiate', 1);
  
      console.log('call_acceptance_payload', payload);
      Services.post('call_acceptance', {}, payload, true)
        .then(responseJson => {
          
  
          var response = responseJson.arr;
          console.log('call_acceptance', response);
  
          
        })
        .catch(error => {
          console.log('_error', error);
          this.setState({
            loading: false,
          });
        });



  }

  const optionRef = useRef();
  const isMainScreen = () => {
    return !isVisibleJoinMeetingContainer && !isVisibleCreateMeetingContainer;
  };

  useFocusEffect(
    React.useCallback(() => {
      mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
          setTrack(stream);
        })
        .catch((e) => {
          console.log(e);
        });
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!isMainScreen()) {
          setisVisibleCreateMeetingContainer(false);
          setisVisibleJoinMeetingContainer(false);
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [isVisibleCreateMeetingContainer, isVisibleJoinMeetingContainer])
  );
  // var userImage = "";
  // if (doctrDetail[0].signup_gendar == "male")
  //   userImage = Constants.imgBaseUrl + "avatar_male.jpeg";
  // else if (doctrDetail[0].signup_gendar == "female")
  //   userImage = Constants.imgBaseUrl + "avatar_female.jpeg";


    // console.log('____userImage',userImage);
    // console.log('____userImage',doctrDetail[0]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        backgroundColor: colors.primary["900"],
      }}
    >

      <CallingSound/>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colors.primary["900"],
            justifyContent: "space-between",
          }}
        >
        
        {
          acceptance  == false ? 
          <View style={{height:'100%',width:'100%',paddingHorizontal:20, backgroundColor:'white', }} >
                
                {
                  userData.signup_type == 1 ? 

                  
                  <>
                  <View style={{height:'70%',width:'100%', paddingHorizontal:20,alignItems:'center', justifyContent: 'center'}}>

                      <Text style={{fontSize:15,marginVertical:120,}}>Please wait while patient is accepting call.</Text>
                      
                      </View>

                      <View style={{width:'100%',height:120,alignItems:'center',justifyContent: 'center'}}>

                        <ActivityIndicator color={Constants.Colors.primaryBlue} size="large" /> 

                      
                      </View> 
                    
                      </>
                  
                  : 
                  <>
                  <View style={{height:'70%',width:'100%', paddingHorizontal:20,alignItems:'center', justifyContent: 'center'}}>
                      <Image
                        style={{ width: 150, height: 150, resizeMode: "contain", borderRadius:75 , marginTop: 90}}
                        // source={Constants.logo}
                        source={{
                          uri: Constants.url+doctrDetail.signup_image_path+doctrDetail.signup_image,
                        }}
                      />

                      <Text style={{fontSize:15,marginVertical:120,}}>Dr {doctrDetail.signup_firstname} is calling you.......</Text>

                      </View>

                      <View style={{width:'100%',height:120,flexDirection:'row'}}>

                      <View style={styles.buttonWrapper}>
                          <TouchableOpacity 

                          onPress={async () => {

                            setVideoOn(false)
                            acceptanceOnPress(false);
                           
                            // setLoading(true)
                            // const token = await getToken();
                            // let valid = await validateMeeting({
                            //   token: token,
                            //   meetingId: meetingId.trim(),
                            // });
                            // if (valid) {
                            //   disposeVideoTrack();
                            //   navigation.navigate(SCREEN_NAMES.Meeting, {
                            //     name: name.trim(),
                            //     token: token,
                            //     meetingId: meetingId.trim(),
                            //     micEnabled: micOn,
                            //     webcamEnabled: videoOn,
                            //     meetingType: meetingType.key,
                            //   });
                            // }
                          }}
                          style={{width:70,height:70,backgroundColor:'green',
                          alignItems:'center', justifyContent:'center', borderRadius:50,}}>
                            <MaterialIcons name="call" style={styles.callingIcon} />
                          </TouchableOpacity>
                      </View>

                      <View style={styles.buttonWrapper}>
                          <TouchableOpacity 
                          onPress={async () => {
                            setLoading(true)
                             console.log('btn press');

                            const token = await getToken();
                            let valid = await validateMeeting({
                              token: token,
                              meetingId: meetingId.trim(),
                            });
                            if (valid) {
                              disposeVideoTrack();
                              navigation.navigate(SCREEN_NAMES.Meeting, {
                                name: name.trim(),
                                token: token,
                                meetingId: meetingId.trim(),
                                micEnabled: micOn,
                                webcamEnabled: videoOn,
                                meetingType: meetingType.key,
                              });

                              

                              console.log("acceptanceOnPress second.");
                                acceptanceOnPress(true);
                            }



                           

                          }}
                          style={{width:70,height:70,backgroundColor:'green',
                          alignItems:'center', justifyContent:'center', borderRadius:50,}}>
                            <MaterialIcons name="video-call" style={styles.callingIcon} />
                          </TouchableOpacity>
                      </View>

                      <View style={styles.buttonWrapper}>
                          <TouchableOpacity 
                          onPress={()=>
                          {

                              navigation.goBack()
                              cancelOnPress();

                            }}
                          style={{width:70,height:70,backgroundColor:'red',
                          alignItems:'center', justifyContent:'center', borderRadius:50,}}>
                            <MaterialIcons name="call-end" style={styles.callingIcon} />
                          </TouchableOpacity>
                      </View>

                      
                      </View> 
                      {/* <Button
                      text={userData.signup_type == 1 ? "Doctor " :"Patient"}
                      onPress={async () => {
                        if (name.trim().length <= 0) {
                          Toast.show("Please enter your name");
                          return;
                        }
                        if (meetingId.trim().length <= 0) {
                          Toast.show("Please enter meetingId");

                          return;
                        }
                        const token = await getToken();
                        let valid = await validateMeeting({
                          token: token,
                          meetingId: meetingId.trim(),
                        });
                        if (valid) {
                          disposeVideoTrack();
                          navigation.navigate(SCREEN_NAMES.Meeting, {
                            name: name.trim(),
                            token: token,
                            meetingId: meetingId.trim(),
                            micEnabled: micOn,
                            webcamEnabled: videoOn,
                            meetingType: meetingType.key,
                          });
                        }
                      }}
                      /> */}
                      </>

                }
                





          </View>
          : 

          <>
          
          <View
            style={{
              paddingTop: "15%",
              height: "45%",
            }}
          >
            <View
              style={{
                flex: 1,
                width: "50%",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                {videoOn && tracks ? (
                  <RTCView
                    streamURL={tracks.toURL()}
                    objectFit={"cover"}
                    mirror={true}
                    style={{
                      flex: 1,
                      borderRadius: 20,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#202427",
                    }}
                  >
                    <Text style={{ color: colors.primary[100] }}>
                      Camera Off
                    </Text>
                  </View>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "transparent",
                  justifyContent: "space-evenly",
                  position: "absolute",
                  bottom: 10,
                  right: 0,
                  left: 0,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setMicon(!micOn);
                  }}
                  style={{
                    height: 50,
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: micOn ? colors.primary["100"] : "red",
                  }}
                >
                  {micOn ? (
                    <MicOn width={25} height={25} fill={colors.black} />
                  ) : (
                    <MicOff
                      width={25}
                      height={25}
                      fill={colors.primary["100"]}
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setVideoOn(!videoOn);
                  }}
                  style={{
                    height: 50,
                    aspectRatio: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: videoOn ? colors.primary["100"] : "red",
                  }}
                >
                  {videoOn ? (
                    <VideoOn width={25} height={25} fill={colors.black} />
                  ) : (
                    <VideoOff
                      width={35}
                      height={35}
                      fill={colors.primary["100"]}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 32 }}>
            {!isVisibleCreateMeetingContainer &&
              !isVisibleJoinMeetingContainer && (
                <>
                  <Button
                    text={"Create a meeting"}
                    onPress={() => {
                      setisVisibleCreateMeetingContainer(true);
                    }}
                  />
                  <Button
                    text={"Join a meeting 2"}
                    backgroundColor={"#202427"}
                    onPress={() => {
                      setisVisibleJoinMeetingContainer(true);
                    }}
                  />
                </>
              )}
            {isVisibleCreateMeetingContainer ? (
              <>
                <TouchableOpacity
                  onPress={async () => {
                    optionRef.current.show();
                  }}
                  style={{
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#202427",
                    borderRadius: 12,
                    marginVertical: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.primary["100"],
                      fontSize: 16,
                      fontFamily: ROBOTO_FONTS.RobotoBold,
                    }}
                  >
                    {meetingType.value}
                  </Text>
                </TouchableOpacity>
                <Menu
                  ref={optionRef}
                  menuBackgroundColor={colors.primary[700]}
                  fullWidth
                >
                  {meetingTypes.map((meetingType, index) => {
                    return (
                      <>
                        <MenuItem
                          title={meetingType.value}
                          onPress={() => {
                            optionRef.current.close(true);
                            setMeetingType(meetingType);
                          }}
                        />
                        {index != meetingTypes.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: colors.primary["600"],
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </Menu>
                {/* <TextInputContainer
                  placeholder={"Enter your name"}
                  value={name}
                  setValue={setName}
                /> */}
                <Button
                  text={"Join a meeting3"}
                  onPress={async () => {
                    if (name.length <= 0) {
                      Toast.show("Please enter your name");
                      return;
                    }
                    const token = await getToken();
                    let meetingId = await createMeeting({ token: token });
                    disposeVideoTrack();
                    navigation.navigate(SCREEN_NAMES.Meeting, {
                      name: name.trim(),
                      token: token,
                      meetingId: meetingId,
                      micEnabled: micOn,
                      webcamEnabled: videoOn,
                      meetingType: meetingType.key,
                    });
                  }}
                />
              </>
            ) : isVisibleJoinMeetingContainer ? (
              <>

              
                <Menu
                  ref={optionRef}
                  menuBackgroundColor={colors.primary[700]}
                  fullWidth
                  bottom={120}
                >
                  {meetingTypes.map((meetingType, index) => {
                    return (
                      <>
                        <MenuItem
                          title={meetingType.value}
                          onPress={() => {
                            optionRef.current.close(true);
                            setMeetingType(meetingType);
                          }}
                        />
                        {index != meetingTypes.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              backgroundColor: colors.primary["600"],
                            }}
                          />
                        )}
                      </>
                    );
                  })}
                </Menu>
              
                {/* <Button
                  text={"Start Consultation"}
                  // style={{}}
                  onPress={async () => {
                    if (name.trim().length <= 0) {
                      Toast.show("Please enter your name");
                      return;
                    }
                    if (meetingId.trim().length <= 0) {
                      Toast.show("Please enter meetingId");

                      return;
                    }
                    const token = await getToken();
                    let valid = await validateMeeting({
                      token: token,
                      meetingId: meetingId.trim(),
                    });
                    if (valid) {
                      disposeVideoTrack();
                      navigation.navigate(SCREEN_NAMES.Meeting, {
                        name: name.trim(),
                        token: token,
                        meetingId: meetingId.trim(),
                        micEnabled: micOn,
                        webcamEnabled: videoOn,
                        meetingType: meetingType.key,
                      });
                    }
                  }}
                /> */}
              </>
            ) : null}
          </View>

      </>

        }
          

          



        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


// const styles = StyleSheet.create({

//   buttonWrapper:{
//     flex:1,
//   }
// })