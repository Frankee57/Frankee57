import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../assets/styles/colors'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux';
import { useState, } from 'react';
import { isConected } from '../redurcer/userSlice';

const SignInScreen = ({ navigation }) => {
  const currentUser = useSelector((state) => state.currentUser)
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const validation = () => {
    if (phone !== currentUser.user.telephone || password !== currentUser.user.password) {
      setError('numéro de téléphone ou mot de passe incorrecte')
      return false
    }
    return true
  }

  const handleLogin = () => {
    // Implémentez ici la logique de connexion en utilisant les valeurs de l'état
    const validate = validation()
    if (validate) {
      dispatch(isConected())
    }
  };

  return (
    <View style={styles.space}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navbarGoBack} onPress={() => navigation.goBack()}>
          <FAIcon
            style={{ fontSize: hp("4%") }}
            color={"white"}
            name={'angle-left'} />
        </TouchableOpacity>
        <Text style={styles.navBarTest}>Créer un compte</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textError} >{error}</Text>
        <TextInput
          label="Numéro de téléphone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
        />
        <TextInput
          label="Mot de passe"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <TouchableOpacity mode="contained" onPress={handleLogin} style={styles.button}>
          <Text style={{ color: 'white' }}>
            Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  space: {
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  navbarGoBack: {
    marginTop: 10,
    marginLeft: 20
  },
  navbarGoBackText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navBarTest: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 95
  },
  navBar: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textError: {
    color: 'red',
    textAlign: 'center',
    fontSize: 15
  },
  input: {
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: colors.primary

  },
});

export default SignInScreen;