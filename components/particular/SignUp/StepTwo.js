import React  , {useState , useContext} from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import MyContext from '../../../contextes/appContext'

const StepTwo = () => {
    const {globalState , setGlobalState} = useContext(MyContext)

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const handleRegistration = () => {
    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Adresse Mail:', email);
    console.log('Numéro de CNI:', idNumber);
    console.log('Numéro de téléphone:', phoneNumber);
    console.log('Quartier de résidence:', address);
    console.log('Ville de résidence:', city);
    console.log('Mot de passe:', password);
    console.log('Confirmer le mot de passe:', confirmPassword);
    setGlobalState(prevState => ({
              ...prevState,
              connecting: true
       }))

       setTimeout(()=>{
          setGlobalState(prevState => ({
              ...prevState,
              connected: true
       }))
       } , 3000)
  };
  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Quartier de résidence"
        value={address}
        onChangeText={text => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        label="Ville de résidence"
        value={city}
        onChangeText={text => setCity(text)}
        style={styles.input}
      />
      <TextInput
        label="Créer un mot de passe"
        value={password}
        secureTextEntry
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />
      <TextInput
        label="Confirmer le mot de passe"
        value={confirmPassword}
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        style={styles.input}
      />
     
        
        <Button mode="contained" onPress={handleRegistration} style={styles.button}>
          <Text style={{ color: 'white' }}>
            Créer mon compte
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StepTwo;
