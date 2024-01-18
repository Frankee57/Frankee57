import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from "react-redux";

import MyContext from '../../../contextes/appContext';
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login } from '../../../redurcer/userSlice';

const StepOne = ({ navigation }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    adresseMail: '',
    cni: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    nom: '',
    adresseMail: '',
    cni: '',
    telephone: '',
    password: '',
    confirmPassword: '',
  })
  const validate = () => {
    setError({
      nom: '',
      adresseMail: '',
      cni: '',
      telephone: '',
      password: '',
      confirmPassword: '',
    })
    if (user.nom.length === 0) {
      setError({
        ...error, nom: 'le nom est obligatoire'
      })
      return false
    }
    if (!user.adresseMail.includes('@')) {
      setError({
        ...error, adresseMail: 'adress mail incorrect'
      })
      return false
    }
    if (user.cni.length === 0) {
      setError({
        ...error, cni: 'ce champ est obligatoire '
      })
      return false
    }
    if (user.telephone.length !== 9) {
      setError({
        ...error, telephone: 'le numéro de téléphon dois contenire 9 chiffre '
      })
      return false
    }
    if (user.password.length < 8) {
      setError({
        ...error, password: 'le mot de passe doit contenire au moins 8 charactère'
      })
      return false
    }
    else if (user.password !== user.confirmPassword) {
      setError({
        ...error, confirmPassword: 'les mots de passes ne correspondent pas'
      })
      return false
    }
    return true
  }
  const handleChange = (key, value) => {
    setUser({
      ...user, [key]: value
    })
  }
  const handleNext = () => {
    const isValidate = validate()
    if (!isValidate) {
      console.log('ici')
      return
    }
    console.log(user)
    dispatch(login(user))
    navigation.navigate("Se connecter")

  }
  return (
    <View style={styles.scrllStyle}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navbarGoBack} onPress={() => navigation.goBack()}>
          <FAIcon
            style={{ fontSize: hp("4%") }}
            color={"white"}
            name={'angle-left'} />
        </TouchableOpacity>
        <Text style={styles.navBarTest}>Créer un compte</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            label="Prénom"
            onChangeText={text => handleChange('prenom', text)}
            style={styles.input}
          />
          <TextInput
            label="Nom *"
            onChangeText={text => handleChange('nom', text)}
            style={[styles.input, {
              borderWidth: error.nom.length !== 0 ? 1 : 0,
              borderColor: error.nom.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.nom}</Text>
          <TextInput
            label="Adresse Mail *"
            onChangeText={text => handleChange('adresseMail', text)}
            style={[styles.input, {
              borderWidth: error.adresseMail.length !== 0 ? 1 : 0,
              borderColor: error.adresseMail.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.adresseMail}</Text>
          <TextInput
            label="Numéro de CNI *"
            onChangeText={text => handleChange('cni', text)}
            style={[styles.input, {
              borderWidth: error.cni.length !== 0 ? 1 : 0,
              borderColor: error.cni.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.cni}</Text>
          <TextInput
            label="Numéro de téléphone *"
            keyboardType='numeric'
            onChangeText={text => handleChange('telephone', text)}
            style={[styles.input, {
              borderWidth: error.telephone.length !== 0 ? 1 : 0,
              borderColor: error.telephone.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.telephone}</Text>
          <TextInput
            label="Mot de passe *"
            secureTextEntry
            onChangeText={text => handleChange('password', text)}
            style={[styles.input, {
              borderWidth: error.password.length !== 0 ? 1 : 0,
              borderColor: error.password.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.password}</Text>
          <TextInput
            label="Entrer à nouveaut votre mot de passe *"
            secureTextEntry
            onChangeText={text => handleChange('confirmPassword', text)}
            style={[styles.input, {
              borderWidth: error.confirmPassword.length !== 0 ? 1 : 0,
              borderColor: error.confirmPassword.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.confirmPassword}</Text>
          <TouchableOpacity mode="contained" onPress={handleNext} style={styles.button}>
            <Text style={{ color: 'white' }}>
              Suivant
            </Text>
          </TouchableOpacity>
          <View style={styles.testConnect}>
            <Text>
              Avez-vous déjà un compte ?
            </Text>
            <TouchableOpacity style={styles.connectButoton}
              onPress={() => navigation.navigate('Se connecter')}
            >
              <Text style={styles.textConnect}> Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrllStyle: {
    flex: 1
  },
  container: {
    marginTop: 100,
    position: 'relative',
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
  input: {
    marginVertical: 5,
  },
  textError: {
    color: 'red',
    fontSize: 10,
    textAlign: 'center'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: colors.primary
  },
  testConnect: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  connectButoton: {
    marginLeft: 10,
  },
  textConnect: {
    color: colors.primary
  }
});

export default StepOne;
