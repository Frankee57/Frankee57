import * as React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'
import { colors } from '../../assets/styles/colors';
import Home from '../../screens/Home';
import R2SScreen from '../../screens/R2SScreen';
import NotificationsScreen from '../../screens/NotificationsScreen';
import Menu from '../../screens/Menu';
import { createStackNavigator } from '@react-navigation/stack';
import UrgenceScreen from '../../screens/UrgenceScreen';
import Profile from '../../screens/ProfileScreen';
import HistoMenu from '../../screens/Historique';
import ContratScreen from '../../screens/ContratScreen';
import HistoTransItem from './HistoTransItem';
import DriverScreen from '../../screens/DriverScreen';


// export const items = [
//   {
//     icon: 'person',
//     route: 'Mes Enfants'
//   },
//   {
//     icon: 'person-add',
//     route: 'Enrégistrer votre enfant'
//   },
//   {
//     icon: 'map',
//     route: 'R2S'
//   },
//   {
//     icon: 'person',
//     route: 'Mes conducteurs'
//   },
//   {
//     icon: 'warning',
//     route: 'Signaler une urgence'
//   },
//   {
//     icon: 'notifications',
//     route: 'Notifications'
//   },
//   {
//     icon: 'time',
//     route: 'Mes historiques'
//   },
//   {
//     icon: 'cash',
//     route: 'Gas',

//   },
//   {
//     icon: 'person',
//     route: 'Mon profile'
//   },
// ]
const Stack = createStackNavigator();

const OhterDrow = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        useLegacyImplementation
        initialRouteName="Menu"
        drawerContent={props => <DrawerMenu {...props} />}
      >
        <Stack.Screen name="Menu" component={Menu} />
        {/* <Stack.Screen name="Enrégistrer votre enfant" component={AddChildScreen} /> */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Signaler une urgence" component={UrgenceScreen} />
        <Stack.Screen name="Mon profile" component={Profile} />
        <Stack.Screen name="Mes historiques" component={HistoMenu} />
        <Stack.Screen name="Gas" component={ContratScreen} />
        <Stack.Screen name="Historique des transactions" component={HistoTransItem} />
        {/* <Stack.Screen name="Historique des déplacements" component={HistoRide} /> */}
        <Stack.Screen name="Mes conducteurs" component={DriverScreen} />
        <Stack.Screen name="R2S" component={R2SScreen} />


        {/* Ajoutez d'autres écrans au Drawer ici */}
      </Stack.Navigator>
  )
}

export const items = [
  {
    icons:'home',
    name:'Accueil',
    route: 'Ride 2 School',
    render: <Home/>,
    headerShow: false
},
{
    icons:'map',
    name:'R2S',
    route: 'Suivre mes Enfants',
    render: <R2SScreen/>,
    headerShow: false
},
{
    icons:'notifications',
    name:'notifications',
    route: 'notifications',
    render: <NotificationsScreen/>,
    headerShow: false
},
{
    icons:'person',
    name:'menu',
    route: 'Menu',
    render:<OhterDrow/>,
    headerShow: false
},
]


const DrawerMenu = ({ navigation }) => {
  return (
      <View style={{marginTop:50}}>
        {/* <Text style={styles.logo}>BetaCARD</Text> */}

        {
          items.map((item, index) => {
            return (
              <View key={index}>
                <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20 }}>
                  <Ionicons name={item.icons} size={24} color="black" />
                  <Text style={{ marginLeft: 10, color:'white' }} >{item.route}</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>

                </View>
                <Divider />
              </View>
            )
          })
        }
      </View>
  );
};


const styles = StyleSheet.create({
  logo:{
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  }
})

export default DrawerMenu