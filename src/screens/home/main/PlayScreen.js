import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import formatTime from "../../../config/formatTime";
import timeVidConverter from "../../../config/timeVidConverter";

const tracks = [
  {
    id: 1,
    url: require("../../../assets/audio/CallMe.mp3"),
    title: "Call me",
  },
  {
    id: 2,
    url: require("../../../assets/audio/KidzZone.mp3"),
    title: "Kidz Zone",
  },
];

// TrackPlayer.updateOptions({
//   stopWithApp: false,
//   capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
//   compactCapabilities: [
//     TrackPlayer.CAPABILITY_PLAY,
//     TrackPlayer.CAPABILITY_PAUSE,
//   ],
// });

export default PlayScreen = ({ route, navigation }) => {
  const {
    itemVidId,
    itemAuthor,
    itemName,
    itemDescription,
    itemLinkAudio,
    itemThumb,
    itemDuration,
  } = route.params;

  const back = () => {
    navigation.goBack();
  };

  const [sound, setSound] = useState();
  const [isPlaying, setPlaying] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  // async function playSound() {
  //   console.log("Loading Sound");
  //   const { sound } = await Audio.Sound.createAsync({ uri: itemLinkAudio });
  //   setSound(sound);

  //   console.log("Playing Sound");
  //   await sound.playAsync();
  // }
  // async function pauseSound() {
  //   if (sound) {
  //     console.log("Pausing sound");
  //     await sound.pauseAsync();
  //   }
  // }

  async function toggleSound() {
    console.log("Loading Sound");
    const { sound, status } = await Audio.Sound.createAsync({
      uri: itemLinkAudio,
    });
    if (sound) {
      if (!isPlaying) {
        console.log("Playing Sound");
        await sound.playAsync();
        setSound(sound);
        setPlaying(true);
        setDuration(status.durationMillis);
      } else {
        console.log("Pausing sound");
        await sound.pauseAsync();
        setPlaying(false);
      }
    } else {
      console.log("Loading Sound");
      const { sound, status } = await Audio.Sound.createAsync({
        uri: itemLinkAudio,
      });
    }
  }

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         console.log("Unloading Sound");
  //         sound.unloadAsync();
  //       }
  //     : undefined;
  // }, [sound]);

  useEffect(() => {
    if (sound) {
      const interval = setInterval(async () => {
        const playbackStatus = await sound.getStatusAsync();
        setPosition(playbackStatus.positionMillis);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [sound]);

  async function seekTo(position) {
    if (sound) {
      await sound.setPositionAsync(position);
      setPosition(position);
    }
  }

  return (
    <ImageBackground
      source={{ uri: itemThumb }}
      style={styles.container}
      blurRadius={20}
    >
      <View style={styles.header}>
        <Pressable onPress={back}>
          <Image source={require("icon/back.png")} style={styles.backImg} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <View style={styles.content}>
          <Image source={{ uri: itemThumb }} style={styles.thumbnail} />
          <View style={styles.contentText}>
            <Text style={styles.authorTxt}>{itemAuthor}</Text>
            <Text style={styles.lessionTxt}>{itemName}</Text>
            <Text style={styles.descriptionTxt}>{itemDescription}</Text>
          </View>
        </View>
        <View style={styles.player}>
          {/* <Image source={require("icon/line.png")} style={styles.playerLine} /> */}
          <Slider
            style={styles.playerLine}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={(value) => seekTo(value)}
            minimumTrackTintColor="white"
            thumbTintColor="white"
          />
          <View style={styles.duration}>
            <Text style={styles.leftTxt}>{formatTime(position)}</Text>
            <Text style={styles.rightTxt}>
              {timeVidConverter(itemDuration)}
            </Text>
          </View>
          <View>
            <Pressable>
              <Image />
            </Pressable>
          </View>
          <View style={styles.playBtn}>
            <Pressable style={styles.playBack}>
              <Image
                source={require("icon/back10.png")}
                style={styles.playIcon}
              />
            </Pressable>
            <Pressable style={styles.playBackM} onPress={toggleSound}>
              <Image
                source={
                  !isPlaying
                    ? require("icon/play.png")
                    : require("icon/pause.png")
                }
                style={styles.playIcon}
              />
            </Pressable>
            <Pressable style={styles.playBack}>
              <Image
                source={require("icon/next10.png")}
                style={styles.playIcon}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.bottomBtn}>
          <Image source={require("icon/list.png")} style={styles.bottomImg} />
        </Pressable>
        <Pressable style={styles.bottomBtn} onPress={() => setSaved(!isSaved)}>
          <Image
            source={
              !isSaved ? require("icon/save.png") : require("icon/saved.png")
            }
            style={styles.bottomImg}
          />
        </Pressable>
        <Pressable style={styles.bottomBtn}>
          <Image source={require("icon/share1.png")} style={styles.bottomImg} />
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  header: {
    flexDirection: "row",
    width: 375,
    height: 88,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: "space-between",
    top: 50,
  },
  backImg: {
    width: 24,
    height: 24,
  },

  body: {
    width: 327,
    alignSelf: "center",
    top: 50, //120
    gap: 24,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: 327,
    height: 362,
  },
  thumbnail: {
    width: 220,
    height: 220,
    borderRadius: 16,
  },
  contentText: {
    alignItems: "center",
    height: 118,
  },
  authorTxt: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 10,
  },
  lessionTxt: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
    marginTop: 10,
    height: 48,
  },
  descriptionTxt: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 10,
    height: 22,
  },
  player: {
    width: "100%",
  },
  playerLine: {
    width: 357,
    height: 4,
    alignSelf: "center",
    color: "white",
  },
  duration: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 15,
  },
  leftTxt: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "white",
  },
  rightTxt: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: "white",
  },
  playBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  playIcon: {
    width: 24,
    height: 24,
  },
  playIconM: {
    width: 22,
    height: 22,
  },
  playBack: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    padding: 24,
    marginTop: 8,
  },
  playBackM: {
    width: 88,
    height: 88,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
    padding: 32,
    marginLeft: 16,
    marginRight: 16,
  },

  footer: {
    flexDirection: "row",
    width: 184,
    height: 40,
    gap: 32,
    alignSelf: "center",
    marginBottom: "auto",
    position: "absolute",
    bottom: 30,
  },
  bottomBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    padding: 8,
    gap: 8,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
  },
  bottomImg: {
    width: 24,
    height: 24,
  },
});
