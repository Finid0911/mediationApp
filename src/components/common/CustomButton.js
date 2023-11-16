import { TouchableOpacity, StyleSheet, Text } from "react-native";

const CustomButton = (props) => {
  const { title, onPress } = props;
  return (
    <TouchableOpacity style={styles.bottomBtn} onPress={onPress}>
      <Text style={styles.txt}> {title} </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bottomBtn: {
    alignSelf: "auto",
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    color: "white",
    marginLeft: 10,
  },
  txt: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    textAlign: "center",
    alignItems: "center",
  },
});

export default CustomButton;
