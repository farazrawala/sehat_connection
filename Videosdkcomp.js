import React, { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Text, Image,TextInput } from "react-native";
import { MeetingProvider } from "@videosdk.live/react-native-sdk";
import MeetingContainer from "./src/MeetingContainer";
import { getToken, createMeeting, validateMeeting } from "./src/api";
import { notifyMessage } from "./src/util";
import * as Animatable from "react-native-animatable";
import { Constants, Utils } from "./src/utils";


export default function Videosdkcomp({endMeeting}) {
  const [token, setToken] = useState("");
  const [idValue, setIdValue] = useState("7gf0-xwmk-n0pn");
  const [meetingId, setMeetingId] = useState("7gf0-xwmk-n0pn");

  const resetMeeting = () => {
    setToken("");
    setMeetingId("");
    setIdValue("");
    endMeeting();

    // console.log('Reset meeting is called.');
    // navigation.navigate('ConsultationHistory');

  };

  const getTokenAndMeetingId = async () => {
    const token = await getToken();
    const meetingId = await createMeeting({ token });

    console.log('meetingId',meetingId);

    setToken(token);
    setMeetingId(meetingId);
    if (!token || !meetingId) {
      notifyMessage("Token or Meeting Id is not generated");
    }
  };

  const validateMeetingId = async () => {
    if (idValue) {
      const token = await getToken();
      const meetingId = await validateMeeting({ meetingId: idValue, token });
      setToken(token);
      setMeetingId(meetingId);
      if (!token || !meetingId) {
        notifyMessage("Token or Meeting Id is invalid");
      }
    } else {
      notifyMessage("Please provide meetingId in textinput");
    }
  };


  useEffect(() => {
    validateMeetingId();
    // getTokenAndMeetingId()
  },[]);


  return token && meetingId ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "User",
          notification: {
            title: "Sehat connection",
            message: "Consultation Started",
          },
        }}
        token={token}
      >
        <MeetingContainer resetMeeting={resetMeeting} />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 6 * 10,
      }}
    >


          <Animatable.View
            style={{marginTop:0, alignItems: "center",justifyContent: "center"}}
            animation="slideInDown"
            iterationCount={1}
            direction="alternate"
          >
            <Image
              style={{ width: 300, height: 200, resizeMode: "contain" }}
              source={Constants.logo}
            />
            <Text style={{fontSize:15,marginVertical:20,}}>Starting Video Consultation...</Text>
          </Animatable.View>

{/* 
      <TouchableOpacity
        onPress={getTokenAndMeetingId}
        style={{ backgroundColor: "#1178F8", padding: 12, borderRadius: 6 }}
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
          Create Meeting
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: "center",
          fontSize: 22,
          marginVertical: 16,
          fontStyle: "italic",
          color: "grey",
        }}
      >
        ---------- OR ----------
      </Text>
      <TextInput
        value={idValue}
        onChangeText={setIdValue}
        placeholder={"XXXX-XXXX-XXXX"}
        style={{
          color:'red',
          padding: 12,
          borderWidth: 1,
          borderRadius: 6,
          fontStyle: "italic",
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "#1178F8",
          padding: 12,
          marginTop: 14,
          borderRadius: 6,
        }}
        onPress={validateMeetingId}
      >
        <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
          Join Meeting
        </Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
}