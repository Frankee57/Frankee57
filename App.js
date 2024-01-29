import  React from 'react';
import { Text, SafeAreaView, StyleSheet , ScrollView , View} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
// import { CardStyleInterpolators } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';

import { store } from './redurcer/store';
// import MyContext ,  {MyProvider} from './contextes/appContext'
// You can import supported modules from npm
// import { Card } from 'react-native-paper';
// import StartScreen from './screens/StartScreen'
// import HomeScreen from './screens/HomeScreen'
// import DetailsScreen from './screens/HomeScreen'
// import SignUpScreen from './screens/SignUpScreen'
// import SignInScreen from './screens/SignInSreen'
// or any files within the Snack
// import AssetExample from './components/AssetExample';
import Visitor from './navigation/Visitor'
import User from './navigation/User'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import {colors} from './assets/styles/colors'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
     surface: 'white' // Modifiez cette couleur pour votre couleur préférée
  },
};


const Navigation = ()=>{
   const currentUser = useSelector((state)=> state.currentUser)
   console.log(currentUser.conected);
     if(!currentUser.conected){
        return (
       <Visitor />
        )
     }else{
        return (
       <User />
     )
     }
}
export default function App() {


  return (
 <PaperProvider theme={theme}>
 <GestureHandlerRootView style={{ flex: 1 }}>
   <Provider store={store}>
       <Navigation />
   </Provider>
   </GestureHandlerRootView>
  </PaperProvider>

  );
}


