import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import ButtonSocial from "components/common/ButtonSocial";
import CustomButton from "components/common/CustomButton";

function SignUpScreen({ navigation }) {
  return (
    <ImageBackground
      source={require("backgroundImg/bg_login.jpg")}
      style={styles.background}
    >
      <View>
        <TouchableOpacity>
          <Image source={require("icon/cancel.png")} style={styles.cancelImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Image source={require("icon/ellipse_13.png")} style={styles.image} />
        <Text style={styles.subtext}>Chào mừng đến</Text>
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
          Đăng ký tài khoản để theo dõi luyện tập hàng ngày
        </Text>

        <ButtonSocial
          onPress={() => {
            navigation.navigate("SignUpInput");
          }}
          title="Tiếp tục với Facebook"
          icon="facebook.png"
        />
        <ButtonSocial
          onPress={() => {
            navigation.navigate("SignUpInput");
          }}
          title="Tiếp tục với Google"
          icon="google.png"
        />
        <ButtonSocial
          onPress={() => {
            navigation.navigate("SignUpInput");
          }}
          title="Tiếp tục với Apple"
          icon="apple.png"
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
            navigation.navigate("SignUpInput");
          }}
        >
          <View style={styles.buttonContent}>
            <Image source={require("icon/email.png")} style={styles.icon} />
            <Text style={[styles.buttonText, { color: "white" }]}>
              Đăng ký với Email
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "white",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          Bằng việc nhấn "Đăng ký", bạn đã đọc và đồng ý với
          <Text style={{ fontWeight: 500 }}> Chính sách và điều khoản </Text>
          của chúng tôi
        </Text>
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.buttonContent}>
          <Text style={{ textAlign: "center", fontSize: 14, color: "white" }}>
            Bạn đã có tài khoản?
          </Text>
          <CustomButton
            title="Đăng nhập"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  background: {
    flex: 1,
    resizeMode: "cover", // Thay đổi giữa 'cover', 'contain', 'stretch', 'repeat', 'center'
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
  bottomBtn: {
    alignSelf: "auto",
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    color: "white",
    marginLeft: 10,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    alignItems: "center",
  },
  cancelImg: {
    width: 40,
    height: 40,
    marginTop: 40,
    marginLeft: 10,
  },
});

export default SignUpScreen;
