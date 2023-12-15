import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import CustomTextInput from "components/common/CustomTextInput";
import CustomButton from "components/common/CustomButton";
import { validateEmail, validatePassword } from "../../config/validate";
import { LinearGradient } from "expo-linear-gradient";
import { authService } from "../../api/auth.api";
import { moq } from "../../config/api";

function LoginScreen1({ navigation }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [revealPassword, setRevealPassword] = useState(true);

  const handleLogin = async () => {
    // try {
    //   const response = await axios.post(`${api_url}/login?moq=1311&dev=1`, {
    //     emailInput: emailInput,
    //     passwordInput: passwordInput,
    //   });

    //   if (response.data.success) {
    //     navigation.navigate("HomeLayout");
    //   } else {
    //     Alert.alert("Login failed!");
    //   }
    // } catch (error) {
    //   console.log("Error", error);
    // }
    try {
      console.log("Log log");
      const response = await authService.login(
        {
          account: 2,
          email: "namnh3@vega.com.vn",
          password: "Haokma2001",
          id: "01982yfho8ds7619",
          os: "android",
        },
        {
          params: { moq: moq, dev: 1 },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onPress = () => {
    let isValid = false;
    isValidEmail = validateEmail(emailInput);
    isValidPass = validatePassword(passwordInput);
    if (isValidEmail === isValid || isValidPass === isValid) return;
    if (isValidEmail) {
      navigation.navigate("HomeLayout");
    }
  };

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
          <Text style={styles.headerText}> Đăng nhập </Text>
        </View>
      </View>

      <View style={styles.container}>
        <CustomTextInput
          content="Email"
          onChangeText={(newEmailInput) => setEmailInput(newEmailInput)}
          value={emailInput || ""}
        />
        {!validateEmail(emailInput).isValidated ? (
          <Text style={styles.errorTxt}>
            {validateEmail(emailInput).message}
          </Text>
        ) : null}

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Mật khẩu"
            placeholderTextColor={"gray"}
            style={styles.inputTxt}
            secureTextEntry={revealPassword}
            onChangeText={(newPasswordInput) =>
              setPasswordInput(newPasswordInput)
            }
            value={passwordInput}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              setRevealPassword(!revealPassword);
            }}
          >
            <Image
              source={
                revealPassword
                  ? require("icon/show.png")
                  : require("icon/hide.png")
              }
              style={styles.icon}
            ></Image>
          </TouchableOpacity>
        </View>
        {!validatePassword(passwordInput).isValidated ? (
          <Text style={styles.errorTxt}>
            {validatePassword(passwordInput).message}
          </Text>
        ) : null}

        <View style={styles.containerBottom}>
          <Text style={styles.warningTxt}>Quên mật khẩu ?</Text>
          <CustomButton title="Mật khẩu mới" />
        </View>
      </View>

      <View style={styles.footer}>
        <LinearGradient
          colors={["#4681F2", "#8A47F7"]}
          style={styles.linearContent}
        >
          <TouchableOpacity style={styles.continueBtn} onPress={handleLogin}>
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
    fontSize: 16,
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
  containerBottom: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: 20,
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
  errorTxt: {
    color: "red",
    marginTop: 5,
    fontSize: 16,
  },
});

export default LoginScreen1;
