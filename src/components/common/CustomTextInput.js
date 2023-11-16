import { StyleSheet, View, TextInput } from "react-native";

const CustomTextInput = (props) => {
  const { content, onChangeText, value } = props;
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={content}
        onChangeText={onChangeText}
        placeholderTextColor={"gray"}
        style={styles.inputTxt}
        value={value}
      ></TextInput>
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
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
});
