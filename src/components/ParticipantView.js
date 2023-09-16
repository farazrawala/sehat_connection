import React, { useEffect, useRef } from "react";
import { View, Text ,useWindowDimensions} from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import { Constants, Utils } from "../../src/utils";

export default function ParticipantView({ participantId, participantsArrId ,index, currentVideoUser}) {
  const {
    displayName,
    webcamStream,
    screenShareStream,
    webcamOn,
    micOn,
    screenShareOn,
    isLocal,
    isActiveSpeaker,
    isMainParticipant,
    setViewPort
  } = useParticipant(participantId, {});

  const layout = useWindowDimensions();

  const TextContainer = ({ fText, sText }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 4,
          marginVertical: 4,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {fText}
        </Text>
        <Text
          style={{
            color: "white",
            marginLeft: 4,
            fontSize: 16,
          }}
        >
          {sText}
        </Text>
      </View>
    );
  };

  const InfoOverLay = () => {

    console.log('participantsArrId___'+participantsArrId,participantsArrId.length);

    return (
      <View
        style={{
          backgroundColor: "rgba(0,0,0, 0.5)",
          position: "absolute",
          padding: 12,
          bottom: 0,
          right: 0,
          left: 0,
          borderRadius: 8,
          borderWidth:2,
          borderColor: "black",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {/* 
        <TextContainer fText={"Name :"} sText={displayName} />
        <TextContainer fText={"Mute :"} sText={micOn ? "No" : "Yes"} />
        <TextContainer fText={"WebCam :"} sText={webcamOn ? "Yes" : "No"} />
        <TextContainer
          fText={"Screen Share :"}
          sText={screenShareOn ? "Yes" : "No"}
        />
        <TextContainer
          fText={"Active Speaker :"}
          sText={isActiveSpeaker ? "Yes" : "No"}
        />
        */}
        
         <TextContainer fText={"Local :"} sText={isLocal ? "Yes" : "No"} />
         <TextContainer fText={"index :"} sText={index} />
         <TextContainer fText={"participantsArrId Length :"} sText={participantsArrId.length } />
        <TextContainer
          fText={"Main Participant :"}
          sText={isMainParticipant ? "Yes" : "No"}
        />
      </View>
    );
  };

  return (
    <View
      key={participantId}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        flex: 1,
        height:'100%'
      }}
    >
      {screenShareOn ? (
        <>
          <View style={{ flexDirection: "row", flex: 1 }}
            onLayout={(event) => {
              const { width, height } = event.nativeEvent.layout;
              if (!isLocal && webcamStream) {
                setViewPort(width, height);
                // setViewPort('100%', '100%');
              }
            }}>
            <RTCView
              streamURL={new MediaStream([webcamStream?.track]).toURL()}
              objectFit={"cover"}
              mirror={isLocal ? true : false}
              style={{
                flex: 0.5,
              }}
            />
            <RTCView
              streamURL={new MediaStream([screenShareStream?.track]).toURL()}
              style={{
                backgroundColor: "black",
                flex: 0.5,
              }}
            />
          </View>
          <InfoOverLay />
        </>
      ) : webcamOn ? (
        <>
         {/* this section is working on Video calling  */}
         {
                !isLocal ? null
                //   <RTCView
                //   onLayout={(event) => {
                //     const { width, height } = event.nativeEvent.layout;
                //     if (isLocal && webcamStream) {
                //       setViewPort(width, height);
                //     }
                //   }}
                //   streamURL={new MediaStream([webcamStream.track]).toURL()}
                //   objectFit={"cover"}
                //   mirror={false}
                //   style={{
                //     width: "100%",
                //     // position: 'relative',
                //     height: layout.height-250,
                //   }}
                // /> 
                // <View style={{position: 'absolute',right:0, marginTop: layout.height-250}}>
                //   <RTCView
                //     onLayout={(event) => {
                //       const { width, height } = event.nativeEvent.layout;
                //       if (isLocal && webcamStream) {
                //         setViewPort(width, height);
                //       }
                //     }}
                //     streamURL={new MediaStream([webcamStream.track]).toURL()}
                //     objectFit={"cover"}
                //     mirror={false}
                //     style={{
                //       width: 150 ,
                //       height:  225
                //     }}
                //   />
                // </View> 
                : null
                
         }
         {
           <RTCView
              onLayout={(event) => {
                const { width, height } = event.nativeEvent.layout;
                if (isLocal && webcamStream) {
                  setViewPort(width, height);
                }
              }}
              streamURL={new MediaStream([webcamStream.track]).toURL()}
              objectFit={"cover"}
              mirror={false}
              style={{
                width:  "100%" ,
                height: participantsArrId.length == 1 ? layout.height - 100 : layout.height/2.15
              }}
            />
         }

          {/*  */}
          {/* <InfoOverLay /> */}
          {/* this section is working on Video calling  */}
        </>
      ) : (
        <>
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: layout.height - 80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >

            {Utils.showSpinner(true)}    
            <Text style={{ fontSize: 16 }}>Connecting Media...</Text>
          </View>
          {/* <InfoOverLay /> */}
          {/* {Utils.showSpinner(true)} */}
        </>
      )}
    </View>
  );
}
