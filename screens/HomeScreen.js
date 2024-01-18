import * as React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import * as Location from "expo-location"

import { colors } from '../assets/styles/colors'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useEffect } from 'react';

export default HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(()=>{
    (async ()=>{
      let {status} = await Location.requestForegroundPermissionsAsync();
      console.log('status ',status);
      if(status !== 'granted'){
        setErrorMsg('permission denied')
        return
      }
      console.log('test');
      try {
        let localization = await Location.getCurrentPositionAsync({})
        console.log('autre teste');
        setLocation(localization);
      } catch (error) {
         console.log('test2');
         setErrorMsg('permission denied')
         console.log('petite erreur', error);
      }
      
     
      
      console.log('localisation',location);
      console.log('erroe',errorMsg);
    })();
  },[])

  console.log('la');

  if(errorMsg){
    console.log('ici');
    return (
      <View>
        <Text>
          activer votre location
        </Text>
      </View>
    )
  }
  return (
    <View>
      <View>
        <Image style={{ width: 500, height: 500 }} source={require('../assets/images/homepage1.jpg')} />
      </View>


      <View style={styles.container}>
        <Text style={styles.message}>
          Les trajets éducatifs confortables et sûrs
        </Text>

        <View style={styles.actionsButtons}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Créer un compte/Etape1')}
            style={styles.signUpBtn}
            labelStyle={styles.label}
          >
            Inscription
          </Button>
          <Button
            mode=""
            onPress={() => navigation.navigate('Se connecter')}
            style={styles.signInBtn}
            labelStyle={{ color: '#3498db' }}
          >
            Connexion
          </Button>
        </View>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10
  },
  message: {
    fontWeight: '900',
    textAlign: 'center',
    fontSize: 30,
    opacity: 0.6

  },
  actionsButtons: {
    padding: 20
  },
  signUpBtn: {
    borderRadius: 20,
    padding: 5,
    marginVertical: 4,
    backgroundColor: colors.primary
  },
  signInBtn: {
    marginVertical: 4,

  },
  label: {
    color: 'white', // Couleur du texte du bouton
  },


});
