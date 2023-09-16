import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {RTCView} from 'react-native-connectycube';
import {CallService} from '../../services';
import CallingLoader from './CallingLoader';
import {Constants, Utils} from '../../utils';

export default ({streams}) => {
  const RTCViewRendered = ({userId, stream}) => {
    if (stream) {
      // console.log('streams__', streams);

      return (
        <RTCView
          objectFit="cover"
          style={styles.blackView}
          key={userId}
          streamURL={stream.toURL()}
        />
      );
    }

    return (
      <View style={styles.blackView}>
        <CallingLoader name={CallService.getUserById(userId, 'name')} />
      </View>
    );
  };

  const streamsCount = streams.length;

  let RTCListView = null;

  switch (streamsCount) {
    case 1:
      RTCListView = (
        <RTCViewRendered
          userId={streams[0].userId}
          stream={streams[0].stream}
        />
      );
      break;

    case 2:
      RTCListView = (
        <View style={styles.inColumn}>
          <View
            style={{
              flex: 3,
              backgroundColor: 'white',
              borderRadius: 10,
              overflow: 'hidden',
              margin: 15,
              marginBottom: 0,
            }}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Constants.video_banner}
                style={styles.homeBanner}
              />
            </View>
            <View
              style={{
                width: 100,
                backgroundColor: 'white',
                marginRight: 15,
                marginVertical: 10,
                overflow: 'hidden',
                borderRadius: 10,
              }}>
              <RTCViewRendered
                userId={streams[1].userId}
                stream={streams[1].stream}
              />
            </View>
          </View>
        </View>
      );
      break;

    case 3:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
            <RTCViewRendered
              userId={streams[1].userId}
              stream={streams[1].stream}
            />
          </View>
          <RTCViewRendered
            userId={streams[2].userId}
            stream={streams[2].stream}
          />
        </View>
      );
      break;

    case 4:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
            <RTCViewRendered
              userId={streams[1].userId}
              stream={streams[1].stream}
            />
          </View>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[2].userId}
              stream={streams[2].stream}
            />
            <RTCViewRendered
              userId={streams[3].userId}
              stream={streams[3].stream}
            />
          </View>
        </View>
      );
      break;

    default:
      break;
  }

  return <View style={styles.blackView}>{RTCListView}</View>;
};

const styles = StyleSheet.create({
  homeBanner: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
  },
  blackView: {
    flex: 1,
    backgroundColor: 'black',
  },
  inColumn: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  inRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
