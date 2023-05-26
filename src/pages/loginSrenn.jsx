import React, { useEffect, useState } from 'react';
import {
  f7,
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  Navbar,
  Block,
  ListItem,
  Button,
  LoginScreen,
  Toolbar,
  Link,
  Icon
} from 'framework7-react';
import { auth, db } from '../components/backend';
import { getAuth, reload, signInWithEmailAndPassword } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import Loader from '../components/loader';


let user ;
let usersArray;
if (localStorage.getItem('user')!==null) {
  user =  JSON.parse(localStorage.getItem('user'))
}
 const  Login = () => {

  const [loaded , setLoaded] = useState(false)
  const getUser=(email)=>{

  const usersRef = ref(db, 'users/');

    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      
      if (usersData) {
        // Convertir les données de la base de données en tableau
         usersArray = Object.entries(usersData).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      const user = usersArray.find(user => user.email === email);

      console.log('user',user)
      localStorage.setItem('user', JSON.stringify(user))
      if (localStorage.getItem('user')!==null) {
    localStorage.setItem('connected',email )
    window.location.reload();
}

      }
    });


}

 const getWorker=(email)=>{

  const usersRef = ref(db, 'workers/');

    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      
      if (usersData) {
        // Convertir les données de la base de données en tableau
       const  workersArray = Object.entries(usersData).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      const worker = workersArray.find(worker => worker.email === email);

      console.log('worker',worker)
      localStorage.setItem('worker', JSON.stringify(worker))
      if (localStorage.getItem('worker')!==null||localStorage.getItem('worker')!==undefined) {
    localStorage.setItem('connectedAsWorker',email )
    window.location.reload();
    }else{
      f7.dialog.alert('Vous ne pouvez pas vous connecter')
    }

      }
    });


}


useEffect(()=>{


},[])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginScreenOpened, setLoginScreenOpened] = useState(false);

  const signIn = () => {
    f7.dialog.alert(`Username: ${email}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
    });
  };

  return (
    <Page>
      {
        !loaded ?

        
    <Page>
  
      <List form>
        <ListInput
          label="Email"
          type="email"
          placeholder="Votre email"
          value={email}
          onInput={(e) => {
            setEmail(e.target.value);
          }}
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List>
      <List style={{width: '90%', marginLeft:' 3%'}}>
           <Button fill
           onClick={
            ()=>{
                setLoaded(true)
                signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Connexion réussie, récupérez les informations de l'utilisateur
                    const login = userCredential.user;
                       getUser(email)
                      setLoaded(false)

                  })
                  .catch((error) => {
                    // Une erreur s'est produite, affichez le message d'erreur
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`Erreur de connexion : ${errorCode} - ${errorMessage}`);
                  });
              



            }
           }
           >Se connecter </Button>   <br />

            <Button fill
           onClick={
            ()=>{
                setLoaded(true)
                signInWithEmailAndPassword(auth, email, password)
                  .then((userCredential) => {
                    // Connexion réussie, récupérez les informations de l'utilisateur
                    const login = userCredential.user;
                       getWorker(email)
                      setLoaded(false)

                  })
                  .catch((error) => {
                    // Une erreur s'est produite, affichez le message d'erreur
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`Erreur de connexion : ${errorCode} - ${errorMessage}`);
                  });
              



            }
           }
           >Se connecter à mon compte prestataire</Button>         
      </List>
    </Page>: <Loader />
      }
 
 
    </Page>
  );
};


export default Login;