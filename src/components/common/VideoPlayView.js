import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import timeVidConverter from "../../config/timeVidConverter";

export default VideoPlayView = ({ item, onPress }) => {
  const timeConverter = timeVidConverter(item.duration);
  return (
    <View style={style.container}>
      <View style={style.leftContainer}>
        <Pressable style={style.blur} onPress={() => onPress(item.id)}>
          <Image source={{ uri: item.thumb }} style={style.vidImg} />
          <Image source={require("icon/play2.png")} style={style.playImg} />
        </Pressable>
        <View style={style.content}>
          <Text style={style.contentTxt}>{timeConverter}</Text>
        </View>
      </View>
      <View style={style.rightContainer}>
        <Text style={style.exTitle}>{item.name}</Text>
        <Text style={style.taTitle}>{item.authors[0].name}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    padding: 8,
    height: "auto",
    marginBottom: 10,
    borderRadius: 16,
  },
  vidImg: {
    width: 100,
    height: 100,
    borderRadius: 16,
    position: "relative",
  },
  blur: {
    width: 100,
    height: 100,
    borderRadius: 16,
    position: "relative",
  },
  playImg: {
    position: "absolute",
    width: 24,
    height: 24,
    margin: 38,
  },
  leftContainer: {
    position: "relative",
    alignContent: "center",
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 20,
    width: 100,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    position: "absolute",
    bottom: 0,
    gap: 4,
  },
  contentTxt: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    alignSelf: "center",
  },
  rightContainer: {
    marginLeft: 10,
    justifyContent: "center",
    width: 230,
  },
  exTitle: {
    fontSize: 16,
    lineHeight: 22,
    color: "white",
  },
  taTitle: {
    fontSize: 14,
    lineHeight: 22,
    color: "rgba(255, 255, 255, 0.6)",
  },
});
