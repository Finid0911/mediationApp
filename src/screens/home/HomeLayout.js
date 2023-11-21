import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./main/HomeScreen";
import AccountScreen from "./account/AccountScreen";
import ExploreScreen from "./explore/ExploreScreen";

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Explore") {
            iconName = "ellipse-outline";
          } else if (route.name === "Account") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          width: 239,
          height: 62,
          alignSelf: "center",
          borderRadius: 16,
          paddingLeft: 12,
          paddingRight: 12,
          paddingTop: 8,
          paddingBottom: 8,
          marginBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          lineHeight: 10,
          fontWeight: "400",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
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

export default HomeLayout;
