import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./main/HomeScreen";
import AccountScreen from "./account/AccountScreen";
import ExploreScreen from "./explore/ExploreScreen";
import { StyleSheet } from "react-native";
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Trang chủ") {
            iconName = "home";
          } else if (route.name === "Khám phá") {
            iconName = "ellipse-outline";
          } else if (route.name === "Tài khoản") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.container,
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 10,
          fontWeight: "400",
          alignSelf: "center",
        },
      })}
    >
      <Tab.Screen
        name="Trang chủ"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Khám phá"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Tài khoản"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const HomeLayout = () => {
  return (
    // <NavigationContainer>

    <MyTabs />
    // </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: 240,
    height: 62,
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 8,
    elevation: 0,
    position: "absolute",
    alignSelf: "center",
    left: "50%",
    transform: [
      {
        translateX: -120,
      },
    ],
  },
});

export default HomeLayout;
