import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

export const items = [
    {
        icons:'home',
        name:'Accueil',
        route: 'Home',
        headerShow: false
    },
    {
        icons:'map',
        name:'R2S',
        route: 'suivre',
        headerShow: false
    },
    {
        icons:'notifications',
        name:'notifications',
        route: 'notifications',
        headerShow: false
    },
    {
        icons:'person',
        name:'Profil',
        route: 'Mon Profil',
        headerShow: false
    },
]

const DrawMenu = ({navigation}) => {
  return (
    <View style = {{marginTop:50}} >
      {
        items.map(item=>{
            return(
                <View>

                    <TouchableOpacity onPress={()=>navigation.navigate(item.route)}
                    style = {{
                        flexDirection: 'row',
                        alignItems:'center',
                        marginTop:'20',
                        marginLeft:20
                    }}>
                        <Ionicons name={item.icons} size={24} color="black"/>
                        <Text style={{marginLeft:10}} > {item.route} </Text>
                    </TouchableOpacity>
                    <View style={{ marginTop:10 }}>

                    </View>
                </View>
            )
        })
      }
    </View>
  )
}

export default DrawMenu