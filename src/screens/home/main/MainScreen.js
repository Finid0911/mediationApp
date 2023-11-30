import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ItemHome from "components/common/ItemHome";
import { API_URL } from "../../../config/api";
import { moq } from "../../../config/api";
import { useState, useEffect } from "react";
import axios from "axios";
import getRealTime from "../../../config/getRealTime";

const MainScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/listSeriesForHome`, {
          params: {
            cate_id: 1,
            page_no: 1,
            page_size: 5,
            moq: moq,
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  });

  if (!data) {
    return (
      <Text style={{ alignSelf: "center", justifyContent: "center" }}>
        Loading...
      </Text>
    );
  }

  const handleItemPress = (itemId) => {
    navigation.navigate("Detail", { itemId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("backgroundImg/bg.jpg")}
        style={styles.imgBackground}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.hItemText}>Xin chào,</Text>
            <Text style={styles.hNameText}>Bạn của tôi</Text>
          </View>
          <View style={styles.headerBtn}>
            <LinearGradient
              colors={["#4681F2", "#8A47F7"]}
              style={styles.hItemBtn}
            >
              <Pressable>
                <Text style={styles.hItemText} onPress={handleItemPress}>
                  Đăng ký
                </Text>
              </Pressable>
            </LinearGradient>
          </View>
        </View>
        <ScrollView style={styles.sView}>
          <View style={styles.body}>
            <View style={styles.circle}>
              <View style={styles.topContent}>
                <Text style={styles.bNameText}>Thời gian thiền</Text>
                <Text style={styles.bTimeText}>{getRealTime()}</Text>
                <View style={styles.iconPallete}>
                  <Image
                    source={require("icon/mediation.png")}
                    style={styles.icon}
                  />
                  <Text style={styles.palText}>0/2</Text>
                </View>
              </View>
              <View style={styles.bottomContent}>
                <LinearGradient
                  colors={["#4681F2", "#8A47F7"]}
                  style={styles.linearContainer}
                >
                  <Pressable
                    onPress={() => console.log("Start mediate!")}
                    style={styles.startBtn}
                  >
                    <Text style={styles.startTxt}>Bắt đầu thiền</Text>
                  </Pressable>
                </LinearGradient>
              </View>
            </View>
          </View>
          <View style={styles.listTitle}>
            <Text style={styles.hItemText}>Dành cho bạn</Text>
          </View>
          <View style={styles.listSeries}>
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
            <Pressable style={styles.moreBtb}>
              <Text style={{ color: "white", fontSize: 20 }}>Khám phá</Text>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Platform.OS === "Android" ? 25 : 0,
  },
  imgBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  sView: {
    flex: 1,
    // marginTop: 40,
  },
  header: {
    flexDirection: "row",
    marginTop: 40,
    alignItems: "center",
    marginLeft: 20,
  },
  headerText: {
    marginRight: "auto",
  },
  hItemText: {
    color: "white",
    fontSize: 20,
  },
  hNameText: {
    color: "white",
    fontSize: 26,
  },
  headerBtn: {
    marginLeft: "auto",
  },
  hItemBtn: {
    padding: 10,
    paddingLeft: 26,
    paddingRight: 26,
    borderRadius: 20,
  },

  body: {
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: "transparent",
    width: 284,
    height: 284,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 140,
  },
  bNameText: {
    marginTop: 30,
    color: "white",
    fontSize: 16,
    lineHeight: 22,
    alignSelf: "center",
  },
  bTimeText: {
    color: "white",
    fontSize: 64,
    alignSelf: "center",
    lineHeight: 64,
    marginTop: 10,
  },
  iconPallete: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0.07)",
    width: 103,
    height: 42,
    borderRadius: 50,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {
    marginRight: "auto",
    width: 25,
    height: 25,
  },
  palText: {
    marginLeft: "auto",
    fontSize: 20,
    color: "white",
    fontWeight: "500",
  },
  topContent: {
    flex: 3,
  },
  bottomContent: {
    width: 268,
    alignSelf: "center",
    marginTop: 20,
    flex: 2,
    overflow: "hidden",
  },
  linearContainer: {
    flex: 1,
    borderBottomLeftRadius: 180,
    borderBottomRightRadius: 180,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  startBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  startTxt: {
    alignSelf: "center",
    fontSize: 18,
    color: "white",
    justifyContent: "center",
  },

  listSeries: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  listTitle: {
    marginTop: 30,
    marginLeft: 20,
  },
  moreBtb: {
    width: 100,
    height: 40,
    backgroundColor: "red",
  },
});
