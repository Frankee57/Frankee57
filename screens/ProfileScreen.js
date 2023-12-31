import React, { useEffect } from 'react';
import { View, ScrollView, Text , TouchableOpacity} from 'react-native';
import { Avatar, Button, List, Divider, IconButton, Appbar } from 'react-native-paper';
import profileStyle from '../assets/styles/css/profile';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Profile = ({  user }) => {
   const navigation = useNavigation()
  const handlePress = (item) => {
    // Gérer les actions lorsque l'élément est cliqué
    console.log(`Vous avez cliqué sur ${item}`);
  };
   useEffect(()=>{

   },[])
  return (
    <ScrollView style={profileStyle.container}>
      <View style={profileStyle.avatarContainer}>
        {/* Icône pour changer le thème */}
        <Avatar.Image
          source={require('../assets/images/t3.jpg')}
          size={100}
        />
      </View>

      {/* Nom et prénom */}
      <View style={profileStyle.nameContainer}>
        <Text style={profileStyle.nameText}>John Doe</Text>
      </View>

      {/* Numéro de téléphone et bouton "Modifier" */}
      <View style={profileStyle.contactContainer}>
        <Text style={profileStyle.phoneNumber}> +123 456 789</Text>
        <Button mode="contained" style={profileStyle.editButton}>
         <Text style={{color: 'white'}}>Modifier</Text>
        </Button>
      </View>

      {/* Liste des options */}
       <List.Section>
        <TouchableOpacity onPress={() => handlePress('Sécurité')}>
          <List.Item
            title="Sécurité"
            left={() => <List.Icon icon="lock" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Langue')}>
          <List.Item
            title="Langue"
            left={() => <List.Icon icon="earth" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Mes contrats')}>
          <List.Item
            title="Mes contrats"
            left={() => <List.Icon icon="bus" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Mes factures')}>
          <List.Item
            title="Mes factures"
            left={() => <List.Icon icon="file-document" />}
          />
        </TouchableOpacity>
        <Divider />
        {/* Ajoutez d'autres éléments de la liste ci-dessous */}
        <TouchableOpacity onPress={() => handlePress('CGV/CGU')}>
          <List.Item
            title="CGV/CGU"
            left={() => <List.Icon icon="bookmark" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Confidentialité')}>
          <List.Item
            title="Confidentialité"
            left={() => <List.Icon icon="lock" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Archivage')}>
          <List.Item
            title="Archivage"
            left={() => <List.Icon icon="archive" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Se déconnecter')}>
          <List.Item
            title="Se déconnecter"
            left={() => <List.Icon icon="logout" />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handlePress('Supprimer mon compte')}>
          <List.Item
            title="Supprimer mon compte"
            left={() => <List.Icon icon="delete" />}
          />
        </TouchableOpacity>
      </List.Section>
    </ScrollView>
  );
};

export default Profile;
