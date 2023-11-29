import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
  Modal,
  FlatList,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import formatTime from "../../../config/formatTime";
import timeVidConverter from "../../../config/timeVidConverter";
import { API_URL } from "../../../config/api";
import axios from "axios";
import { moq } from "../../../config/api";
import VideoPlayView from "../../../components/common/VideoPlayView";

export default PlayScreen = ({ route, navigation }) => {
  const {
    itemVidId,
    itemIdd,
    itemAuthor,
    itemName,
    itemDescription,
    itemLinkAudio,
    itemThumb,
    itemDuration,
    numAudio,
    authorId,
  } = route.params;

  const [sound, setSound] = useState();
  const [isPlaying, setPlaying] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [vidData, setVidData] = useState(null);

  const back = () => {
    navigation.goBack();
  };

  const closePopUp = () => {
    setVisibleModal(!visibleModal);
  };

  // async function toggleSound() {
  //   console.log("Loading Sound");
  //   const { sound, status } = await Audio.Sound.createAsync({
  //     uri: itemLinkAudio,
  //   });
  //   if (sound) {
  //     console.log("Load successfully!");
  //     setSound(sound);
  //     if (!isPlaying) {
  //       console.log("Playing sound!");
  //       await sound.playAsync();
  //       setPlaying(true);
  //       setDuration(status.durationMillis);
  //     } else {
  //       console.log("Pausing sound!");
  //       await sound.pauseAsync();
  //       setPlaying(false);
  //       setDuration(status.durationMillis);
  //     }
  //   } else {
  //     console.log("Load unsuccessfully!");
  //   }
  // }

  async function toggleSound() {
    if (sound) {
      if (!isPlaying) {
        console.log("Playing sound!");
        await sound.playAsync();
        setPlaying(true);
      } else {
        console.log("Pausing sound!");
        await sound.pauseAsync();
        setPlaying(false);
      }
    } else {
      console.log("Load unsuccessfully!");
      const { sound, status } = await Audio.Sound.createAsync({
        uri: itemLinkAudio,
      });
      if (sound) {
        setSound(sound);
        setDuration(status.durationMillis);
        setPlaying(true);
        await sound.playAsync();
      } else {
        console.log("Play unsuccessfully!");
      }
    }
  }

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

  async function seekForward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      const newPosition = Math.min(
        status.positionMillis + 10000,
        status.durationMillis
      );
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  }

  async function seekBackward() {
    if (sound) {
      const status = await sound.getStatusAsync();
      const newPosition = Math.min(
        status.positionMillis - 10000,
        status.durationMillis
      );
      await sound.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  }

  useEffect(() => {
    const fetchVidData = async () => {
      try {
        const response = await axios.get(`${API_URL}/listAudioFileBySeries`, {
          params: {
            account: 345,
            series_id: itemIdd,
            id: "01982yfho8ds7619",
            os: "android",
            token_user: "123123",
            secure_code: "01982yfho8ds7619and",
            moq: moq,
            dev: 1,
          },
        });
        setVidData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVidData();
  }, []);

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
            <Pressable
              onPress={() =>
                navigation.navigate("AuthorScreen", {
                  authorId: authorId,
                  itemAuthor: itemAuthor,
                })
              }
            >
              <Text style={styles.authorTxt}>{itemAuthor}</Text>
            </Pressable>
            <Text style={styles.lessionTxt}>{itemName}</Text>
            <Text style={styles.descriptionTxt}>{itemDescription}</Text>
          </View>
        </View>
        <View style={styles.player}>
          <Slider
            style={styles.playerLine}
            minimumValue={0}
            maximumValue={duration}
            value={position}
            onSlidingComplete={(value) => seekTo(value)}
            minimumTrackTintColor="white"
            thumbTintColor="white"
            thumbTouchSize={{ width: 50, height: 50 }}
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
            <Pressable style={styles.playBack} onPress={seekBackward}>
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
            <Pressable style={styles.playBack} onPress={seekForward}>
              <Image
                source={require("icon/next10.png")}
                style={styles.playIcon}
              />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={styles.bottomBtn}
          onPress={() => setVisibleModal(true)}
        >
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

      <View>
        <Modal
          animationType="slide"
          visible={visibleModal}
          transparent
          style={styles.modal}
          backdropOpacity={0.1}
        >
          <View style={styles.popUp}>
            <View style={styles.headerModal}>
              <Text style={styles.modalTxt}>
                Danh sách bài giảng (?/{numAudio})
              </Text>
              <Pressable onPress={closePopUp}>
                <Image
                  source={require("icon/close.png")}
                  style={styles.closeBtn}
                />
              </Pressable>
            </View>
            <View style={styles.flatList}>
              <FlatList
                data={vidData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <VideoPlayView
                    item={item}
                    onPress={() => {
                      navigation.navigate("PlayScreen", {
                        itemVidId: item.id,
                        itemIdd: itemIdd,
                        itemAuthor: item.authors[0].name,
                        itemName: item.name,
                        itemDescription: item.description,
                        itemLinkAudio: item.link,
                        itemThumb: item.thumb,
                        itemDuration: item.duration,
                      });
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Modal>
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

  //modal
  modal: {
    // backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  popUp: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: 700,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    marginTop: 60,
  },
  headerModal: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTxt: {
    height: 24,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 24,
    color: "white",
    marginLeft: 100,
  },
  closeBtn: {
    width: 24,
    height: 24,
    alignItems: "flex-end",
    marginRight: 10,
  },
  flatList: {
    width: "100%",
    flex: 1,
  },
});
