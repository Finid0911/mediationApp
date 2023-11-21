import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import CustomTextInput from "components/common/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

function SignUpScreen1() {
  const navigation = useNavigation();

  return (
    <View style={styles.overall}>
      <View style={styles.header}>
        <View style={styles.rowContainer}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Image source={require("icon/left.png")} style={styles.backImg} />
          </Pressable>
          <Text style={styles.headerText}> Đăng ký </Text>
        </View>
      </View>

      <View style={styles.container}>
        <CustomTextInput content="Họ và tên" />

        <CustomTextInput content="Email" />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor={"gray"}
            style={styles.inputTxt}
          ></TextInput>
          <Image source={require("icon/show.png")} style={styles.icon}></Image>
        </View>

        <Text style={styles.warningTxt}>Mật khẩu tối thiếu 6 ký tự!</Text>
      </View>

      <View style={styles.footer}>
        <LinearGradient
          colors={["#4681F2", "#8A47F7"]}
          style={styles.linearContent}
        >
          <TouchableOpacity style={styles.continueBtn}>
            <Text style={styles.continueTxt}>Tiếp tục</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overall: {
    flex: 1,
    backgroundColor: "#252A45",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252A45",
    marginTop: 40,
    //justifyContent: 'flex-start', // Căn button sang trái
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backImg: {
    width: 40,
    height: 40,
  },
  headerText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    alignItems: "center",
    position: "relative",
    alignSelf: "center",
  },

  container: {
    justifyContent: "center",
    margin: 20,
  },

  icon: {
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  warningTxt: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "white",
    marginTop: 20,
  },
  inputTxt: {
    margin: 10,
    fontSize: 20,
    marginLeft: 20,
    width: "80%",
    alignItems: "center",
    color: "gray",
  },

  footer: {
    margin: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "transparent",
    position: "absolute",
    bottom: 0,
    width: "90%",
  },
  continueBtn: {
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
  },
  continueTxt: {
    color: "white",
    fontSize: 22,
    height: 36,
    alignItems: "center",
    marginTop: 8,
  },
  linearContent: {
    borderRadius: 10,
  },
});

export default SignUpScreen1;
