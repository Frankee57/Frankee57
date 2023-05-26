import { onValue, ref } from "firebase/database";
import { db } from "../backend";
export const getUser=(email)=>{
const usersRef = ref(db, 'users/');

    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      
      if (usersData) {
        // Convertir les données de la base de données en tableau
      const   usersArray = Object.entries(usersData).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      const user = usersArray.find(user => user.email === email);

      console.log('user',user)
      localStorage.setItem('user', JSON.stringify(user))

      }
    });


}


export const getWorker=(email)=>{
const workersRef = ref(db, 'users/');

    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(workersRef, (snapshot) => {
      const workersData = snapshot.val();
      
      if (workersData) {
        // Convertir les données de la base de données en tableau
      const   workersArray = Object.entries(workersData).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      const worker = workersArray.find(worker => worker.email === email);

      console.log('woker',user)
      localStorage.setItem('worker', JSON.stringify(worker))

      }
    });


}