import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import timeConverter from "../../config/timeConverter";

const ItemHome = ({ item, onPress }) => {
  const time = timeConverter(item.duration);
  return (
    <Pressable style={styles.container} onPress={() => onPress(item.id)}>
      <View style={styles.bodyContainer}>
        <Image source={{ uri: item.thumb }} style={styles.imgBackground} />
        <View style={styles.midContainer}>
          <Text style={styles.leftTxt}>
            {item.number_audio} bài - {time}
          </Text>
          <View style={styles.rightView}>
            <Image
              source={require("icon/Vector.png")}
              style={styles.rightIcon}
            />
            <Text style={styles.rightTxt}> {item.like} </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.titleText}> {item.name} </Text>
        <Text style={styles.authorText}> {item.authors[0].name} </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 343,
  },
  bodyContainer: {
    marginTop: 10,
    position: "relative",
  },
  imgBackground: {
    width: 343,
    height: 193,
    borderRadius: 15,
  },
  titleText: {
    color: "white",
    fontSize: 18,
    lineHeight: 24,
  },
  authorText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
  },
  midContainer: {
    width: 343,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 36,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingLeft: 10,
    paddingRight: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  leftTxt: {
    marginRight: "auto",
    alignSelf: "center",
    color: "white",
    fontSize: 14,
  },
  rightView: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  rightTxt: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  rightIcon: {
    width: 13,
    height: 16,
    marginRight: 2,
    justifyContent: "center",
    alignSelf: "center",
  },
  bottomContainer: {
    position: "relative",
  },
});

export default ItemHome;
