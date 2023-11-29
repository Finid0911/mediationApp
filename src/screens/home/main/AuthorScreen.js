import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  FlatList,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { API_URL, moq } from "../../../config/api";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import ItemHome from "../../../components/common/ItemHome";
import RenderHTML from "react-native-render-html";

export default AuthorScreen = ({ route, navigation }) => {
  const { authorId } = route.params;
  const [data, setData] = useState(null);
  const [auData, setAuData] = useState(null);
  const { width, height } = Dimensions.get("screen");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/getContentByAuthor`, {
          params: {
            account: 1,
            author_id: authorId,
            id: "01982yfho8ds7619",
            os: "android",
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
    console.log(data);

    const fetchAuthorDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/getAuthorDetail`, {
          params: {
            account: 1,
            author_id: authorId,
            id: "01982yfho8ds7619",
            os: "android",
            secure_code: "019and82yfho8ds7619",
            moq: moq,
          },
        });
        setAuData(response.data.data);
      } catch (error) {
        console.error("Error fetching author data: ", error);
      }
    };

    fetchData();
    fetchAuthorDetail();
  }, []);

  console.log(data);

  if (!data) {
    return (
      <Text style={{ alignItems: "center", justifyContent: "center" }}>
        Loading...
      </Text>
    );
  }

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={back}>
          <Image source={require("icon/back.png")} style={styles.backIcon} />
        </Pressable>
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.infoView}>
            <View style={styles.circleThumb}>
              <Image source={{ uri: auData.thumb }} style={styles.thumb} />
              {/* <Image
                source={require("backgroundImg/vidImg.png")}
                style={styles.thumb}
              /> */}
            </View>
            <Text style={[styles.text]}>Tác giả</Text>
            <Text style={[styles.text, styles.author]}>{auData.name}</Text>
            <LinearGradient
              colors={["#4681F2", "#8A47F7"]}
              style={styles.followBtn}
            >
              <Pressable>
                <Text style={[styles.text]}>Theo dõi ngay</Text>
              </Pressable>
            </LinearGradient>
            <RenderHTML
              source={{ html: auData.description }}
              contentWidth={width}
              baseStyle={styles.text}
            />
          </View>
          <View style={styles.listView}>
            <Pressable>
              <Text style={[styles.text]}>Xem thêm</Text>
            </Pressable>
            <Text style={[styles.text, styles.guideText]}>
              Hướng dẫn ({data.total})
            </Text>
            <FlatList
              scrollEnabled={false}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ItemHome
                  item={item}
                  onPress={() => {
                    navigation.navigate("Detail", {
                      itemId: item.id,
                      authorId: item.authors[0].id,
                    });
                  }}
                />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252A45",
    flex: 1,
  },

  // header
  header: {
    flexDirection: "row",
    marginTop: 30,
    padding: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    gap: 8,
    marginLeft: 5,
  },

  // body
  body: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    width: 343,
  },
  infoView: {
    alignItems: "center",
    justifyContent: "center",
  },
  circleThumb: {
    height: 160,
    width: 160,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  thumb: {
    width: 148,
    height: 148,
    borderRadius: 100,
  },
  text: {
    color: "white",
    fontWeight: "400",
    lineHeight: 24,
    fontSize: 16,
  },
  author: {
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 30,
  },
  followBtn: {
    borderRadius: 16,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
    marginTop: 10,
    width: 148,
  },
  description: {
    marginTop: 20,
  },
  listView: {
    marginTop: 10,
  },
  guideText: {
    lineHeight: 24,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "white",
  },
});
