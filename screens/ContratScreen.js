import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import {colors} from '../assets/styles/colors'
const ContratScreen = () => {
  const [solde, setSolde] = useState('actif');

  useEffect(() => {
    const observationTimer = setTimeout(() => {
      setSolde('observation');
    }, 5000);

    const inactifTimer = setTimeout(() => {
      setSolde('inactif');
    }, 10000);

    return () => {
      clearTimeout(observationTimer);
      clearTimeout(inactifTimer);
    };
  }, []);

  const getStatusColor = () => {
    if (solde === 'actif') {
      return '#4CAF50';
    } else if (solde === 'observation') {
      return '#FFC107';
    } else {
      return '#F44336';
    }
  };
  const handleReactivate = () => {
    // Ajoutez la logique pour réactiver le contrat et contacter l'école ici
    Alert.alert('Contrat réactivé !', 'Veuillez contacter l\'école pour plus d\'informations.');
    setSolde('actif');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statut de votre contrat</Text>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
      </View>
      {
        solde==='observation'&&(
             <Text style={styles.observationText}>
            Votre compte serait inactif dans peu de temps. Veuillez renouveller votre contrat
          </Text>
        )
      }
      {solde === 'inactif' && (
        <View style={styles.inactiveContainer}>
          <Text style={styles.inactiveText}>
            Votre compte est inactif. Veuillez contacter l'école pour réactiver votre contrat.
          </Text>
          {solde === 'inactif' && (
        <Button mode="contained" onPress={handleReactivate} style={styles.button}>
          <Text style={{color: 'white'}}> Activer votre compte</Text>
        </Button>
      )}
        </View>
      )}
      <Text style={styles.subtitle}>Consultez vos factures de transport :</Text>
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name="description" size={24} color="#3498DB" />
        <Text style={styles.iconText}>Rubrique Facture</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialIcons name="email" size={24} color="#3498DB" />
        <Text style={styles.iconText}>Par Email</Text>
      </TouchableOpacity>
      <Text style={styles.note}>
        Note : Les factures sont générées automatiquement à chaque paiement effectué.
      </Text>
      <Image
        source={{ uri: 'https://boby.net/wp-content/uploads/elementor/thumbs/A4-Leadmagnet-7-q48dgg1fwk6grw8s7z4dz4j1i7vd3dfo1fgosatvr4.jpg' }} // Remplacez l'URL par le lien de votre image
        style={styles.illustration}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ECF0F1',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    marginLeft: 10,
    borderRadius: 10,
  },
  inactiveContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  inactiveText: {
    fontSize: 18,
    color: '#E74C3C',
    marginBottom: 30,
    textAlign: 'center',
  },
  observationText:{
     fontSize: 18,
    color: '#FFC107',
    marginBottom: 30,
    textAlign: 'center',
  },
 button: {
    marginVertical: 10,
    backgroundColor: colors.primary,
        color: 'white'

  },
  subtitle: {
    marginTop: 60,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  iconText: {
    marginLeft: 15,
    fontSize: 18,
    color: '#3498DB',
  },
  note: {
    marginTop: 60,
    fontStyle: 'italic',
    color: '#7F8C8D',
  },
  illustration: {
    marginTop: 60,
    width: 300,
    height: 200,
    alignSelf: 'center',
  },
});

export default ContratScreen;
