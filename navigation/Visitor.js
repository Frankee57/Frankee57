import React, { useRef, useEffect, useState, useContext } from 'react';
import { Text, SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { Card } from 'react-native-paper';
import StartScreen from '../screens/StartScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/HomeScreen';
import {SignUpScreen1 , SignUpScreen2} from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInSreen';
import MyContext, { MyProvider } from '../contextes/appContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal'
  }
  return 'vertical';
};

const Visitor = () => {
  const navigationRef = useRef(null);
  const [connected, setConnected] = useState();
  const { globalState, setGlobalState } = useContext(MyContext);

  useEffect(() => {}, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
          screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS, // ou toute autre transition que vous souhaitez utiliser
        })}
      >
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Créer un compte/Etape1" component={SignUpScreen1} options={{ headerShown: true }} />
        <Stack.Screen name="Créer un compte/Etape2" component={SignUpScreen2} options={{ headerShown: true }} />
        <Stack.Screen name="Se connecter" component={SignInScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Visitor;
