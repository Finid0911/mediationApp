import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "./src/screens/signup/SignUpScreen";
import SignUpScreen1 from "./src/screens/signup/SignUpInputScreen";
import LoginScreen from "./src/screens/login/LoginScreen";
import LoginScreen1 from "./src/screens/login/LoginInputScreen";
import HomeLayout from "./src/screens/home/HomeLayout";
import PlayScreen from "./src/screens/home/main/PlayScreen";
import AuthorScreen from "./src/screens/home/main/AuthorScreen";
import { QueryClientProvider, QueryClient } from "react-query";

const Stack = createNativeStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Signup"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpInput"
        component={SignUpScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginInput"
        component={LoginScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeLayout"
        component={HomeLayout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayScreen"
        component={PlayScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AuthorScreen"
        component={AuthorScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StackScreen />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
