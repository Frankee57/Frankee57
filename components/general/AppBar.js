import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'


const AppBar = ({title, goback}) => {
  return (
    <AppBar.Header>
        <AppBar.BackAction onpress = {goback} color = 'white'/>
        <AppBar.Content title = {title} titleStyle = {{color: 'white'}}/>
    </AppBar.Header>
  )
}
import { Appbar } from 'react-native-paper'


export default AppBar