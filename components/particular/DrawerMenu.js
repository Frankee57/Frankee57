import * as React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper'
import { colors } from '../../assets/styles/colors';


export const items = [
  {
    icon: 'person',
    route: 'Mes Enfants'
  },
  {
    icon: 'person-add',
    route: 'Enrégistrer votre enfant'
  },
  {
    icon: 'map',
    route: 'R2S'
  },
  {
    icon: 'person',
    route: 'Mes conducteurs'
  },
  {
    icon: 'warning',
    route: 'Signaler une urgence'
  },
  {
    icon: 'notifications',
    route: 'Notifications'
  },
  {
    icon: 'time',
    route: 'Mes historiques'
  },
  {
    icon: 'cash',
    route: 'Gas',

  },
  {
    icon: 'person',
    route: 'Mon profile'
  },
]


const DrawerMenu = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: colors.primary, height: '100%' }}>
      <View style={{marginTop:50}}>
        <Text style={styles.logo}>BetaCARD</Text>

        {
          items.map((item) => {
            return (
              <View style={{}}>
                <TouchableOpacity onPress={() => navigation.navigate(item.route)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20 }}>
                  <Ionicons name={item.icon} size={24} color="black" />
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