import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainScreen from "./MainScreen";
import DetailScreen from "./DetailScreen";
import PlayScreen from "./PlayScreen";

const Stack = createNativeStackNavigator();

// const Main = (props) => {
//   return <MainScreen {...props} />;
// };

const MainStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Play"
        component={PlayScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeScreen = () => {
  return <MainStackNav />;
};
