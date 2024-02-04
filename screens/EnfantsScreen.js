import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UseSelector, useSelector } from 'react-redux';
import MySlide from '../components/general/MySlide'
import ChildForm from '../components/particular/AddChild/ChildForm'
import ChoixPreferenceForm from '../components/particular/AddChild/ChoixPreferenceForm'
import IteConfig from '../components/particular/AddChild/IteConfig'
import GerantDeCasForm from '../components/particular/AddChild/GerantDeCasForm'
import MyContext from '../contextes/appContext'

import car from '../assets/images/car.jpeg'
import { colors } from '../assets/styles/colors';
import Navbar from '../components/Navbar';

const components = [<ChildForm />, <IteConfig />, <GerantDeCasForm />, < ChoixPreferenceForm />];
const ChildScreen = (props) => {
  // const {globalState , setGlobalState}= useContext(MyContext)
  const myChildS = useSelector(state => state.myChild.childs)
  console.log(myChildS);

  return (
    <View style={styles.container}>
      {/* <Navbar title={'Mes Enfants'} navigation={props.navigation}/> */}
      <View style={styles.containerView}>
        {
          myChildS.length > 0 ?
            <FlatList
              keyExtractor={(item) => item.name}
              data={myChildS}
              renderItem={({ item, index }) => {
                return<View style={styles.itemView} key={index}>
                  <Image style={styles.image} source={require('../assets/images/enfant1.jpg')} />
                  <View style={styles.allName}>
                    <Text ><Text style={styles.name}>Nom:</Text>{item.nom}</Text>
                    <Text ><Text style={styles.name}>Prenom:</Text>{item.nom}</Text>
                    <Text ><Text style={styles.name}>classe:</Text>{item.gradle}</Text>
                    <Text ><Text style={styles.name}>Age:</Text>{item.year}</Text>
                    <Text ><Text style={styles.name}>Chauffeur:</Text>{item.driver}</Text>
                    <Text ><Text style={styles.name}>Ecole:</Text>{item.school}</Text>
                  </View>
                </View>
              }}
            /> :
            <View style={styles.errorTest}>
              <Text style={styles.textError}>Vous n'avez pas d'enfant pris en charge !</Text>
            </View>
        }


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  containerView: {
    // marginTop:100,
    width: '100%',
  },
  itemView: {
    width: '90%',
    margin: 10,
    flexDirection: 'row',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowColor: colors.primary,
    shadowRadius: 4,
    elevation: 5,
    height: 150
  },
  image: {
    margin: 15,
    width: 150,
    height: '85%',
  },
  allName: {
    marginTop: 12
  },
  name: {
    fontWeight: 'bold'
  },
  errorTest: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textError: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'red'
  }

});

export default ChildScreen;
