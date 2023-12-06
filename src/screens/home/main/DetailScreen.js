import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { API_URL } from "../../../config/api";
import { moq } from "../../../config/api";
import { useState, useEffect } from "react";
import VideoPlayView from "components/common/VideoPlayView";
import axios from "axios";
import RenderHTML from "react-native-render-html";
import timeConverter from "../../../config/timeConverter";

const { width, height } = Dimensions.get("screen");

export default DetailScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [data, setData] = useState(null);
  const [vidData, setVidData] = useState(null);
  console.log(itemId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/seriesDetail`, {
          params: {
            account: 235,
            series_id: itemId,
            id: "01982yfho8ds7619",
            os: "android",
            token_user: "01982yfho8ds7619and",
            secure_code: "01982yfho8ds7619and",
            moq: moq,
            dev: 1,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchVidData = async () => {
      try {
        const response = await axios.get(`${API_URL}/listAudioFileBySeries`, {
          params: {
            account: 345,
            series_id: itemId,
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

    fetchData();
    fetchVidData();
  }, []);

  if (!data) {
    return <Text>Loading...</Text>;
  }

  const back = () => {
    navigation.goBack();
  };

  const convertTime = timeConverter(data.duration);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style}>
        <ImageBackground source={{ uri: data.thumb }} style={style.imgBG}>
          <View style={style.topContainer}>
            <View style={style.topBtn}>
              <Pressable style={style.topIcon} onPress={back}>
                <Image
                  source={require("icon/back.png")}
                  style={style.topLeftIcon}
                />
              </Pressable>
              <Pressable style={style.topIcon}>
                <Image
                  source={require("icon/share.png")}
                  style={style.topRightIcon}
                />
              </Pressable>
            </View>
          </View>
          <View style={style.infoBar}>
            <Text style={style.leftText}>
              {data.number_audio} bài - {convertTime}
            </Text>
            <View style={style.rightView}>
              <Pressable style={style.rightBtn}>
                <Image
                  source={require("icon/Vector.png")}
                  style={style.rightIcon}
                />
              </Pressable>
              <Text style={style.rightText}>{data.like}K</Text>
            </View>
          </View>
          <View style={style.midContainer}></View>
        </ImageBackground>

        <View style={style.bottomContainer}>
          <View style={style.content}>
            <Text style={style.title}>{data.name}</Text>
            <View style={style.author}>
              <Image
                source={require("icon/account.png")}
                style={style.authorIcon}
              />
              <Text style={style.authorText}>{data.authors[0].name}</Text>
            </View>
            <RenderHTML
              source={{ html: data.description }}
              contentWidth={width}
              baseStyle={style.contentText}
            />
            <Text style={style.contentText}>Xem thêm (Optional)</Text>
          </View>
          <View style={style.content}>
            <Text style={style.vidNum}>Bài giảng ({data.number_audio})</Text>
            <View style={style.list}>
              <FlatList
                scrollEnabled={false}
                data={vidData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <VideoPlayView
                    item={item}
                    onPress={() => {
                      navigation.navigate("PlayScreen", {
                        itemVidId: item.id,
                        itemIdd: itemId,
                        authorName: item.authors[0].name,
                        itemName: item.name,
                        itemDescription: item.description,
                        itemLinkAudio: item.link,
                        itemThumb: item.thumb,
                        itemDuration: item.duration,
                        numAudio: data.number_audio,
                        authorId: item.authors[0].id,
                      });
                    }}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  topContainer: {},
  imgBG: {
    width: "100%",
    height: 375,
  },
  topBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    justifyContent: "space-between",
  },
  topIcon: {
    width: 32,
    height: 32,
    top: 50,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.07)",
  },
  topLeftIcon: {
    width: 32,
    height: 32,
    //marginRight: "auto",
  },
  topRightIcon: {
    width: 32,
    height: 32,
    //marginLeft: "auto",
  },
  infoBar: {
    flexDirection: "row",
    height: 36,
    width: 343,
    backgroundColor: "rgba(17, 17, 17, 0.2)",
    top: 307,
    alignSelf: "center",
    borderRadius: 16,
    gap: 4,
    position: "absolute",
  },
  rightView: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: 10,
  },
  rightText: {
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: "auto",
  },
  rightIcon: {
    width: 13,
    height: 16,
    marginRight: 2,
    marginLeft: "auto",
  },
  rightBtn: {
    justifyContent: "center",
  },
  leftText: {
    marginLeft: 10,
    alignSelf: "center",
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
  midContainer: {
    backgroundColor: "#252A45",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomContainer: {
    backgroundColor: "#252A45",
    width: "100%",
    flex: 1,
  },
  content: {
    marginLeft: 10,
    marginRight: 10,
    // marginBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 10,
  },
  author: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 10,
  },
  authorIcon: {
    width: 16,
    height: 16,
  },
  authorText: {
    fontSize: 16,
    lineHeight: 20,
    color: "white",
  },
  contentText: {
    fontSize: 16,
    lineHeight: 20,
    color: "white",
    marginBottom: 20,
  },
  vidNum: {
    fontSize: 18,
    lineHeight: 20,
    color: "white",
    marginBottom: 20,
  },
  list: {
    marginBottom: 65,
  },
});
