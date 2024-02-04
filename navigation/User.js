import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { UseSelector, useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AddChildScreen from '../screens/AddChildScreen';
import { Divider } from 'react-native-paper'
import DrawerMenu, { items } from '../components/particular/DrawerMenu'
import SlidingComponent from '../components/general/SlidingComponent'
import NotificationsScreen from '../screens/NotificationsScreen'
import IteConfig from '../components/particular/AddChild/IteConfig'
import GerantDeCasForm from '../components/particular/AddChild/GerantDeCasForm'
import ChoixPreferenceForm from '../components/particular/AddChild/ChoixPreferenceForm'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MyContext from '../contextes/appContext'
import UrgenceScreen from '../screens/UrgenceScreen'
import ProfileScreen from '../screens/ProfileScreen'
import HistoMenu from '../screens/Historique'
import ContratScreen from '../screens/ContratScreen'
import HistoTrans from '../components/particular/Historique/histoTrans'
import HistoRide from '../components/particular/Historique/HistoRide'
import CustomHeader from '../components/general/CustomHeader'
import DriverScreen from '../screens/DriverScreen'
import R2SScreen from '../screens/R2SScreen'
import ChildScreen from '../screens/EnfantsScreen';
import { colors } from '../assets/styles/colors';
import Home from '../screens/Home';
import Menu from '../screens/Menu';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const DrawerScreen = () => {
  const component = [
    <Home />,
    <R2SScreen />,
    <NotificationsScreen />,
    <Menu />,
  ]

  // const components = [<AddChildScreen />, <NotificationsScreen />, <UrgenceScreen />]
  return (
    <NavigationContainer>
      <Tab.Navigator
        useLegacyImplementation
        initialRouteName={items[0].route}

        drawerContent={props => <DrawerMenu {...props} />}
      >
        {
          items.map((item, index) => {
            return (
              <Tab.Screen
                key={index}
                name={item.route}
                options={{
                  tabBarLabel: item.name,
                  tabBarIcon: ({ color }) => (
                    <Ionicons name={item.icons} size={26} color={color} />
                  ),
                  headerTitleStyle: {
                    color: 'white',
                    textAlign: 'center',
                    flex: 0
                  },
                  headerStyle: {
                    backgroundColor: colors.primary
                  }
                }}
              >
                {props => item.render}
              </Tab.Screen>
            )
          })
        }
      </Tab.Navigator>
    </NavigationContainer>
  )
}

// const OhterDrow = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         screenOptions={{ headerShown: false }}
//         useLegacyImplementation
//         // initialRouteName="Mes Enfants"
//         drawerContent={props => <DrawerMenu {...props} />}
//       >
//         <Stack.Screen name="Mes Enfants" component={ChildScreen} />
//         <Stack.Screen name="Enrégistrer votre enfant" component={AddChildScreen} />
//         <Stack.Screen name="Notifications" component={NotificationsScreen} />
//         <Stack.Screen name="Signaler une urgence" component={UrgenceScreen} />
//         <Stack.Screen name="Mon profile" component={ProfileScreen} />
//         <Stack.Screen name="Mes historiques" component={HistoMenu} />
//         <Stack.Screen name="Gas" component={ContratScreen} />
//         <Stack.Screen name="Historique des transactions" component={HistoTrans} />
//         <Stack.Screen name="Historique des déplacements" component={HistoRide} />
//         <Stack.Screen name="Mes conducteurs" component={DriverScreen} />
//         <Stack.Screen name="R2S" component={R2SScreen} />


//         {/* Ajoutez d'autres écrans au Drawer ici */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

const getGestureDirection = (route, navigation) => {
  if (route?.params?.previousRoute) {
    return 'horizontal';
  }
  return 'vertical';
};

const StackScreen = () => {
  // const {globalState, setGlobalState} = useContext(MyContext)
  const sidebard = useSelector(state => state.sideBard)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={sidebard.initialScreen}
        screenOptions={({ route, navigation }) => ({
          gestureDirection: getGestureDirection(route, navigation),
          ...TransitionPresets.SlideFromRightIOS, // ou toute autre transition que vous souhaitez utiliser
        })}
      >
        <Stack.Screen name="Configurer l'itinéraire" component={IteConfig} screenOptions={{
          header: (props) => <CustomHeader title={"Configurer l'itinéraire"} />, headerShown: false
        }} />
        <Stack.Screen name="Enrégister le gérant de cas" component={GerantDeCasForm} />
        <Stack.Screen name="Choisir vos préférences" component={ChoixPreferenceForm} />
        {/* Autres écrans de la stack ici */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default function User() {
  // const sidebard = useSelector(state => state.sideBard)
  // const {globalState, setGlobalState} = useContext(MyContext)
  return (
    <View style={{ flex: 1 }}>
     
            <DrawerScreen />
            {/* <OhterDrow/> */}
      

    </View>
  );
}
