import  React, { useState  ,  useContext} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import {colors} from '../assets/styles/colors'
import SignUpForm from '../components/particular/SignUpForm'
import Loader from '../components/general/Loader'
import MyContext from '../contextes/appContext'
// import StepTwo from '../components/particular/SignUp/StepTwo'
import StepOne from '../components/particular/SignUp/StepOne'

export const SignUpScreen1 = ()=>{
     return  <StepOne />

}
// export const SignUpScreen2 = () => {
//        const {globalState , setGlobalState} = useContext(MyContext)

//  if(!globalState.connecting){
//    return  <StepTwo />
//  }else{
//    return <Loader message='Création du compte en cours...'/>
//  }
// };



