import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  Pressable,
} from "react-native";
import { API_URL } from "../../../config/api";
import { useState, useEffect } from "react";
import axios from "axios";

export default PlayScreen = ({ route, navigation }) => {
  const {
    itemVidId,
    itemAuthor,
    itemName,
    itemDescription,
    itemLinkAudio,
    itemThumb,
  } = route.params;

  const back = () => {
    navigation.goBack();
  };

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
          <Image source={require("icon/line.png")} style={styles.playerLine} />
          <View>
            <Pressable>
              <Image />
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.footer}></View>
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
  playerLine: {
    width: 237,
    height: 4,
  },

  footer: {},
});
