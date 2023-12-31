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
import { useQuery } from "react-query";

export default AuthorScreen = ({ route, navigation }) => {
  const { authorId } = route.params;
  const { width, height } = Dimensions.get("screen");
  const [isFollowed, setFollow] = useState(false);

  const getSeries = async () =>
    await axios.get(`${API_URL}/getContentByAuthor`, {
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

  const getAuData = async () =>
    await axios.get(`${API_URL}/getAuthorDetail`, {
      params: {
        account: 1,
        author_id: authorId,
        id: "01982yfho8ds7619",
        os: "android",
        secure_code: "019and82yfho8ds7619",
        moq: moq,
      },
    });

  const { isLoading, isError, data } = useQuery({
    queryKey: ["seriesData"],
    queryFn: getSeries,
    onSuccess: (data) => {
      // console.log(data.data.data.length);
    },
  });
  if (isLoading) {
    <Text style={{ alignItems: "center", justifyContent: "center" }}>
      Loading.....
    </Text>;
  }
  if (isError) {
    <Text style={{ alignItems: "center", justifyContent: "center" }}>
      Error Fetching Data! Try again!
    </Text>;
  }

  const {
    isLoading: loading,
    isError: error,
    data: auData,
  } = useQuery({
    queryKey: ["auData"],
    queryFn: getAuData,
    onSuccess: (auData) => {
      // console.log(auData.data.data);
    },
  });
  if (loading) {
    <Text style={{ alignItems: "center", justifyContent: "center" }}>
      Loading.....
    </Text>;
  }
  if (error) {
    <Text style={{ alignItems: "center", justifyContent: "center" }}>
      Error Fetching Data! Try again!
    </Text>;
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
              {auData?.data.data.thumb ? (
                <Image
                  source={{
                    uri: auData?.data.data.thumb,
                  }}
                  flat
                  style={styles.thumb}
                />
              ) : (
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/3088/3088765.png",
                  }}
                />
              )}
            </View>
            <Text style={[styles.text]}>Tác giả</Text>
            <Text style={[styles.text, styles.author]}>
              {auData?.data.data.name}
            </Text>

            <Pressable onPress={() => setFollow(!isFollowed)}>
              {!isFollowed ? (
                <LinearGradient
                  colors={["#4681F2", "#8A47F7"]}
                  style={styles.followBtn}
                >
                  <Text style={[styles.text]}>Theo dõi ngay</Text>
                </LinearGradient>
              ) : (
                <View style={styles.isChecked}>
                  <Image
                    source={require("icon/follow.png")}
                    style={styles.checkIcon}
                  />
                  <Text style={[styles.text, styles.followText]}>
                    Đang theo dõi
                  </Text>
                </View>
              )}
            </Pressable>

            <RenderHTML
              source={{ html: auData?.data.data.description }}
              contentWidth={width}
              baseStyle={styles.text}
            />
          </View>
          <View style={styles.listView}>
            <Pressable>
              <Text style={[styles.text]}>Xem thêm</Text>
            </Pressable>
            <Text style={[styles.text, styles.guideText]}>
              Hướng dẫn ({data?.data?.total || "null"})
            </Text>
            <FlatList
              scrollEnabled={false}
              data={data?.data?.data || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                // console.log({ item });
                return (
                  <ItemHome
                    item={item}
                    authorName={auData?.data.data.name}
                    onPress={() => {
                      navigation.navigate("Detail", {
                        itemId: item.id,
                      });
                    }}
                  />
                );
              }}
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
    marginBottom: 90,
  },
  guideText: {
    lineHeight: 24,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    color: "white",
  },
  isChecked: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "white",
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    gap: 8,
    marginTop: 10,
    width: 150,
    justifyContent: "center",
  },
  checkIcon: {
    width: 22,
    height: 22,
    gap: 10,
    marginRight: 5,
  },
  followText: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
});
