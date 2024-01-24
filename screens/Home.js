import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { colors } from '../assets/styles/colors'
import { Ionicons } from '@expo/vector-icons'


const nosServices = [
  // {
  //   id: 1,
  //   name: 'Rhit to School',
  //   icon: 'car',
  //   color: 'blue'
  // },
  {
    id: 2,
    name: 'creation site web',
    icon: 'logo-web-component',
    color: 'orange'
  },
  {
    id: 3,
    name: 'creation App',
    icon: 'apps',
    color: 'blue'
  },
  {
    id: 4,
    name: 'Community Manager',
    icon: 'chatbox',
    color: 'green'
  },
  {
    id: 5,
    name: 'TransPort personnelle',
    icon: 'bus',
    color: 'black'
  }
]

const Enfants = [
  {
    id: 1,
    name: 'enfant1',
    image: require('../assets/images/enfant1.jpg'),
    school: 'Ecole 1',
    driver: 'Chauffeur',
    ramassage: 'Ramassage 1',
    depo: 'Depot 1'
  },
  {
    id: 2,
    name: 'enfant2',
    image: require('../assets/images/enfant1.jpg'),
    school: 'Ecole 2',
    driver: 'Chauffeur',
    ramassage: 'Ramassage 1',
    depo: 'Depot 1'
  },
  {
    id: 3,
    name: 'enfant3',
    image: require('../assets/images/enfant1.jpg'),
    school: 'Ecole 1',
    driver: 'Chauffeur',
    ramassage: 'Ramassage 1',
    depo: 'Depot 1'
  },
  {
    id: 4,
    name: 'enfant1',
    image: require('../assets/images/enfant1.jpg'),
    school: 'Ecole 1',
    driver: 'Chauffeur',
    ramassage: 'Ramassage 1',
    depo: 'Depot 1'
  },
  {
    id: 5,
    name: 'enfant1',
    image: require('../assets/images/enfant1.jpg'),
    school: 'Ecole 1',
    driver: 'Chauffeur',
    ramassage: 'Ramassage 1',
    depo: 'Depot 1'
  },
]

const Home = () => {
  const Services = ({ name, icon, color }) => {
    return (
      <TouchableOpacity style={styles.containerService}>
        <Ionicons name={icon} size={24} color={color} />
        <Text style={styles.textContent}>{name}</Text>
      </TouchableOpacity>
    )
  }
  const VosEnfants = ({ name, school, driver, ramassage, depo, image }) => {
    return (
      <TouchableOpacity style={styles.itemEnfant}>
        <Image source={image} style={styles.imageEnfant} />
        <View style={styles.textEnfant}>
          <Text><Text style={styles.prefixe} >nom </Text> : {name}</Text>
          <Text><Text style={styles.prefixe}>Ecole</Text> : {school}</Text>
          <Text><Text style={styles.prefixe} >Chauffeur</Text> : {driver}</Text>
          <Text><Text style={styles.prefixe} >Lieu de ramassage</Text> : {ramassage}</Text>
          <Text><Text style={styles.prefixe} >Lieu de depo</Text> : {depo}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <ScrollView style={styles.container} >
      <View style={styles.serviceTexte}>
        <Text style={styles.serviceTexteContent}>Nos Services</Text>
      </View>
      <FlatList
        data={nosServices}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Services name={item.name} icon={item.icon} color={item.color} />
        )}
      />
      <View style={styles.serviceTexte}>
        <Text style={styles.serviceTexteContent}>Nos Partenaires</Text>
      </View>
      <FlatList
        data={nosServices}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Services name={item.name} icon={item.icon} color={item.color} />
        )}
      />

      <View style={styles.serviceTexte}>
        <Text style={styles.serviceTexteContent}>Vos enfants pris en charge par Betacar</Text>
      </View>
      <View style={styles.containerEnfant}>
        {
          Enfants.map((item) => (
            <VosEnfants key={item.id}  name={item.name} school={item.school} image={item.image} driver={item.driver} ramassage={item.ramassage} depo={item.depo} />
          ))
        }
      </View>

    </ScrollView>
  )
}

export default Home

const styles = StyleSheet.create({
  // container: {
  //   marginTop: 10,
  // },
  serviceTexte: {
    marginTop: 20,
    marginLeft: 20
  },
  serviceTexteContent: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerService: {
    width: 200,
    marginTop: 20,
    // flexDirection: 'row',
    marginLeft: 10,
    height: 80,
    shadowOffset: {
      width: 1,
      height: 5,
    },
    borderRadius: 10,
    shadowOpacity: 0.6,
    shadowColor: colors.primary,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContent: {
    textAlign: 'center',
    fontSize: 14,
    color: colors.primary,
    fontWeight: 'bold'
  },
  containerEnfant: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
  },
  itemEnfant: {
    width: '80%',
    marginTop: 20,
    // justifyContent:'center',
    // alignItems:'center',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    borderRadius: 10,
    shadowOpacity: 0.6,
    shadowColor: colors.primary,
    shadowRadius: 4,
    elevation: 10,
    backgroundColor: 'white',
  },
  imageEnfant: {
    margin: 15,
    width: 300,
    height: 300
  },
  textEnfant:{
    margin:20
  },
  prefixe:{
    fontWeight:'bold'
  }
})