import React, { useEffect, useState } from 'react';
import { List, ListItem } from 'framework7-react';
import '../css/mesDemandes.scss'
import Historique from './Historique';
import { get, getDatabase, ref, set , onValue} from "firebase/database";

import { db } from './backend';
import { data } from 'dom7';
const ClientServiceRequests = () => {
  
  let data;
  const userId = 'boniop'
  const connected = localStorage.getItem('connected')

  const [users, setUsers] = useState([]);

 /*useEffect(() => {
    const usersRef = ref(db, 'users/');

    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      
      if (usersData) {
        // Convertir les données de la base de données en tableau
        const usersArray = Object.entries(usersData).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setUsers(usersArray);
      }
    });

    // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
    return () => {
      onValue(usersRef, null);
    };
  }, []);*/






  /*useEffect(() => {
  // Récupérer des données à partir de la base de données
const usersRef = ref(db, 'users/');
get(usersRef).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(Object.keys(snapshot.val()));
    console.log(Object.values(snapshot.val()));
    data = Object.values(snapshot.val())
   for (let index = 0; index < data.length; index++) {
    if ( data[index].email===connected) {
    }
    users.push({
      
      firstName: data[index].firstName,
      lastName: data[index].lastName,
      email: data[index].email

      
    })
   
    console.log(users)
   }
  } else {
    console.log("Aucune donnée disponible");
  }
}).catch((error) => {
  console.error(error);
});

}, []);*/



/* Modifier des données dans la base de données
const userRef = ref(db, 'users/user1');
set(userRef, {
  name: "John Doe",
  email: "johndoe@example.com"
}).then(() => {
  console.log("Données mises à jour avec succès");
}).catch((error) => {
  console.error(error);
});

// Supprimer des données de la base de données
const userRef = ref(db, 'users/user1');
remove(userRef).then(() => {
  console.log("Données supprimées avec succès");
}).catch((error) => {
  console.error(error);
});
  set(ref(db, 'users/' + userId), 'Boni des coooo');*/
  return (
    <div>
     
         <Historique></Historique>
    </div>
  );
}

export default ClientServiceRequests;
