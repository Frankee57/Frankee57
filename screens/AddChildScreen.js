import React, { useState , useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MySlide from '../components/general/MySlide'
import  ChildForm from '../components/particular/AddChild/ChildForm'
import ChoixPreferenceForm from '../components/particular/AddChild/ChoixPreferenceForm'
import IteConfig from '../components/particular/AddChild/IteConfig'
import GerantDeCasForm from '../components/particular/AddChild/GerantDeCasForm'
import MyContext from '../contextes/appContext'
import Navbar from '../components/Navbar';


const components = [<ChildForm />, <IteConfig />, <GerantDeCasForm />, < ChoixPreferenceForm />];
const EnfantForm = (props) => {
  // const {globalState , setGlobalState}= useContext(MyContext)
 
  return (
    <View style={styles.container}>
      <Navbar title={'Enrgistrer un enfant'} navigation = {props.navigation}  />
        <MySlide content={<ChildForm />} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
 
});

export default EnfantForm;
