import { Pressable, Text, View, StyleSheet, Image } from "react-native";
//import { Image } from "react-native-svg";

const ButtonSocial = (props) => {
  const { onPress, title, icon } = props;
  const url = `img/${icon}`;
  console.log(icon);

  return (
    <View>
      <Pressable style={styles.button} onPress={onPress}>
        <View style={styles.buttonContent}>
          {/* <Image source={require(`img/${icon}`)} style={styles.iconn} /> */}
          {/* <Image source={{ uri: `data:image/png;base64,img/${icon}` }} /> */}
          <Image source={{ uri: icon }} style={styles.iconn} />
          <Text style={styles.buttonText}>{title} </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ButtonSocial;

const styles = StyleSheet.create({
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
  iconn: {
    width: 26,
    height: 26,
    marginRight: 20,
  },
});
