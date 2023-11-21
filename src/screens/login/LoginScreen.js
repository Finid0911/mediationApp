import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonSocial from "components/common/ButtonSocial";
import CustomButton from "components/common/CustomButton";
import { useState } from "react";

function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <ImageBackground
      source={require("backgroundImg/bg_login.jpg")}
      style={styles.background}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={require("icon/cancel.png")} style={styles.cancelImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Image source={require("icon/ellipse_13.png")} style={styles.image} />

        <Text style={styles.subtext}>Mừng quay trở lại</Text>
        <Text style={styles.text}>The mind now</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "white",
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          Vui lòng chọn tài khoản đăng nhập
        </Text>

        <ButtonSocial
          onPress={() => {
            navigation.navigate("LoginInput");
          }}
          title="Tiếp tục với Facebook"
          icon="img/facebook.png"
        />
        <ButtonSocial
          onPress={() => {
            navigation.navigate("LoginInput");
          }}
          title="Tiếp tục với Google"
          icon="img/google.png"
        />
        <ButtonSocial
          onPress={() => {
            navigation.navigate("LoginInput");
          }}
          title="Tiếp tục với Apple"
          icon="img/apple.png"
        />

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "transparent",
              borderWidth: 3,
              borderColor: "white",
            },
          ]}
          onPress={() => {
            navigation.navigate("LoginInput");
          }}
        >
          <View style={styles.buttonContent}>
            <Image source={require("icon/email.png")} style={styles.icon} />
            <Text style={[styles.buttonText, { color: "white" }]}>
              {" "}
              Tiếp tục với Email{" "}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.buttonContent}>
          <Text style={{ textAlign: "center", fontSize: 14, color: "white" }}>
            {" "}
            Bạn chưa có tài khoản?{" "}
          </Text>
          <CustomButton title="Đăng ký" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Thay đổi giữa 'cover', 'contain', 'stretch', 'repeat', 'center'
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 30,
    marginRight: 30,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 32,
    fontWeight: "500",
    marginTop: 5,
  },
  subtext: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
    marginTop: 24,
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: 320,
    marginTop: 15,
    color: "white",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
  containerBottom: {
    flex: 1,
    justifyContent: "flex-end", // Đặt nội dung ở phía dưới cùng
    alignItems: "center",
    textAlign: "center",
    marginBottom: 30,
  },
  cancelImg: {
    width: 40,
    height: 40,
    marginTop: 40,
    marginLeft: 10,
  },
});

export default LoginScreen;
