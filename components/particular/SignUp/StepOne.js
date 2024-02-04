import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../../../assets/styles/colors';
import FAIcon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch } from "react-redux";
import axios from "axios";

// import MyContext from '../../../contextes/appContext';
// import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login } from '../../../redurcer/userSlice';
import { register } from '../../../utils/api';

const StepOne = ({ navigation }) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState({
    adresseMail: '',
    password: '',
    password_confirmation: '',
  })
  const validate = () => {
    setError({
      adresseMail: '',
      password: '',
      password_confirmation: '',
    })
    if (!user.email.includes('@')) {
      console.log('email');
      setError({
        ...error, adresseMail: 'adress mail incorrect'
      })
      return false
    }
    if (user.password.length < 9) {
      console.log('password');
      setError({
        ...error, password: 'le mot de passe doit contenire au moins 8 charactère'
      })
      return false
    }
    else if (user.password !== user.password_confirmation) {
      console.log('cpassword');
      setError({
        ...error, password_confirmation: 'les mots de passes ne correspondent pas'
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
  const handleSubmit = async () => {
    console.log('submit');
    setIsLoading(true)
    const isValidate = validate()
    console.log('validat', isValidate);
    if (!isValidate) {
      console.log('validate')
      setError({
        adresseMail: '',
        password: '',
        password_confirmation: '',
      })
      setIsLoading(false)
      return
    }
    // console.log(user)
    try {
      const { data } = await axios.post(register, user)
      console.log(data);
      setIsLoading(false)
      // dispatch(login(data))
      navigation.navigate("Se connecter")
    } catch (err) {
      setError({
        ...error, adresseMail: 'email déjà utilisé'
      })
      console.log(err);
      setIsLoading(false)
    }
    setIsLoading(false)


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
          {/* <TextInput
            label="Prénom"
            onChangeText={text => handleChange('prenom', text)}
            style={styles.input}
          /> */}
          {/* <TextInput
            label="Nom *"
            onChangeText={text => handleChange('nom', text)}
            style={[styles.input, {
              borderWidth: error.nom.length !== 0 ? 1 : 0,
              borderColor: error.nom.length !== 0 ? 'red' : '',
            }]}
          /> */}
          {/* <Text style={styles.textError}>{error.nom}</Text> */}
          <TextInput
            label="Adresse Mail *"
            onChangeText={text => handleChange('email', text)}
            style={[styles.input, {
              borderWidth: error.adresseMail.length !== 0 ? 1 : 0,
              borderColor: error.adresseMail.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.adresseMail}</Text>
          {/* <TextInput
            label="Numéro de CNI *"
            onChangeText={text => handleChange('cni', text)}
            style={[styles.input, {
              borderWidth: error.cni.length !== 0 ? 1 : 0,
              borderColor: error.cni.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.cni}</Text> */}
          {/* <TextInput
            label="Numéro de téléphone *"
            keyboardType='numeric'
            onChangeText={text => handleChange('telephone', text)}
            style={[styles.input, {
              borderWidth: error.telephone.length !== 0 ? 1 : 0,
              borderColor: error.telephone.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.telephone}</Text> */}
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
            onChangeText={text => handleChange('password_confirmation', text)}
            style={[styles.input, {
              borderWidth: error.password_confirmation.length !== 0 ? 1 : 0,
              borderColor: error.password_confirmation.length !== 0 ? 'red' : '',
            }]}
          />
          <Text style={styles.textError}>{error.password_confirmation}</Text>
          <TouchableOpacity mode="contained" onPress={handleSubmit} style={styles.button}>
            {
              isLoading ? <ActivityIndicator size="large" color="white" /> : <Text style={{ color: 'white' }}>
                Suivant
              </Text>
            }

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
