import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext';
import { useNavigation } from '@react-navigation/native'
const StepOne = () => {
const navigation = useNavigation()
 const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleNext = ()=>{
    navigation.navigate("Créer un compte/Etape2")
    
      }
  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Quel est le nom de votre école"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
      />
      <TextInput
        label="Prénom"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
      />
      <TextInput
        label="Nom"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
      />
      <TextInput
        label="Adresse Mail"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Numéro de CNI"
        value={idNumber}
        onChangeText={text => setIdNumber(text)}
        style={styles.input}
      />
      <TextInput
        label="Numéro de téléphone"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleNext} style={styles.button}>
        <Text style={{ color: 'white' }}>
          Suivant
        </Text>
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10,
    backgroundColor: colors.primary
  },
});

export default StepOne;
