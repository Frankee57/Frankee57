import React, { useState , useEffect } from 'react';
import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Toggle,
  BlockTitle,
  Row,
  Button,
  Range,
  Block,
  Toolbar,
  Icon,
  Link,
  f7
} from 'framework7-react';
import '../css/form.scss'
import { auth, db } from '../components/backend';
import { push, ref, set } from "firebase/database";
import { residences, userProfile } from '../components/services/dataCenter';

import 'firebase/compat/auth'
import { createUserWithEmailAndPassword,  } from 'firebase/auth';
import Loader from '../components/loader';


const DevenirPesta = () => {

    
    
const [firstName, setFirstName]=useState('')
const [lastName,setLastName]=useState('')
const [password,setPassword]= useState('')
const [phone,setPhone]=useState(null)
const [sexe,setSexe]= useState('')
const  [email , setEmail ]= useState('')
const [code, setCode]= useState()
const [dep,setDep] = useState('')
const [com,setCom]= useState('')
const [arr, setArr]= useState('')
const [communes ,setCommunes] = useState(residences[0].communes)
const [arrondissements, setArrondissements]= useState(residences[0].communes[0].arr)
const [depSelected,setDepSelected]=useState(false)
const [comSelected,setComSelected]=useState(false)
let accountNbr = 0 ;
const [conditionsAcceptees, setConditionsAcceptees] = useState(false);

const [started , setStarted ]= useState()
const [ valid , setValid] = useState(false)
const countUserKeys = () => {
  let count = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes("worker")) {
      count++;
    }
  }
  return count;
};
  


console.log(countUserKeys());

function verifierVide() {
    if (email=='') {
      f7.dialog.alert("Vous n'avez pas renseigné votre adresse email")
      .setTitle('Erreur')

    }else{
      if (password=='') {
        f7.dialog.alert("Vous n'avez pas  crée un mot de passe")
        .setTitle('Erreur')
  
      }else{
        if (phone==null) {
		            f7.dialog.alert("Vous n'avez pas renseigné votre numéro de téléphone")

          .setTitle('Erreur')
    
        }else{
          if (lastName=='') {
          f7.dialog.alert("Vous n'avez pas renseigné votre nom")
          .setTitle('Erreur')
    
        }else{
          if (firstName=='') {
          f7.dialog.alert("Vous n'avez pas renseigné votre prénom")
          .setTitle('Erreur')
    
        }else{
          if (sexe=='') {
          f7.dialog.alert("Vous n'avez pas renseigné votre sexe")
          .setTitle('Erreur')
    
        }else{
          if (dep=='') {
          f7.dialog.alert("Vous n'avez pas renseigné votre département")
          .setTitle('Erreur')
    
        }else{
			if (com=='') {
          f7.dialog.alert("Vous n'avez pas renseigné votre commune")
          .setTitle('Erreur')
    
        }else{
          if (arr=='') {
          f7.dialog.alert("Vous n'avez pas renseigné votre arrondisement")
          .setTitle('Erreur')
    
        }else{
          
        }
        }
        }
        }
        }
        }
        }
      } 
    }
}


// Fonction pour vérifier la validité du formulaire

const validate = ()=>{


  if (firstName!==''&&lastName!=''&&phone!=''&&sexe!=''&&dep!=''&&com!=''
  &&arr!=''&&password!=''&&email!='') {
     setStarted(true)
	 

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      let user = {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        dep: dep,
        com: com,
        arr: arr,
        email: email,
        sexe: sexe,
        profile: userProfile
     
     }
      const userId = email.replace('@','o').replace('.','o')
           // Ajouter l'utilisateur dans realtime Database
          

       push(ref(db, 'workers/'), user).then(
      (e)=>{
        setStarted(false)
        set(ref(db, 'workers/'+e.key+'/key') , e.key)
        
        localStorage.setItem('workerKey', e.key)
      f7.views.main.router.navigate('/confirmPresta/')
      localStorage.setItem('connectedAsWorker',email)
  if (localStorage.getItem('worker')==null) {
  user.key = e.key
  localStorage.setItem('worker',JSON.stringify(user))
  }else{
   const lastUser = JSON.parse(localStorage.getItem('worker'))
   lastUser.pic = localStorage.getItem('workerProfile')
  localStorage.setItem(lastUser.email , JSON.stringify(lastUser))
  localStorage.setItem('worker',JSON.stringify(user))

}




    }
   )


   f7.dialog.prompt('Entrez le code reçu',  () => {}, {inputType: 'number'}).on('cancel', () => {
    console.log('Bouton Annuler cliqué');
}).on('ok', (value) => {
    console.log(`Bouton OK cliqué avec la valeur ${value}`);
});

      // Inscription réussie, récupérez les informations de l'utilisateur
      const registered = userCredential.user;
      console.log(`Inscrit en tant que ${registered.email}`);
    })
    .catch((error) => {
      // Une erreur s'est produite, affichez le message d'erreur
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Erreur d'inscription : ${errorCode} - ${errorMessage}`);
    });


   
  
      

 
  }else{
	verifierVide()
  }

}

return(
        <Page name="form" >
   
   

       {
       !started ? 
	   
	   <List inlineLabels noHairlinesMd>
     
	 
	 
      
      
      
   
        <ListInput
          type="email"
          placeholder="Votre adresse mail"
          clearButton
          onChange={
            (e)=>{
              setEmail(e.target.value)
            }
          }
        >
          <Icon material="mail" slot="media"/>
        </ListInput>
  
        <ListInput
          type="password"
          placeholder="Créer un mot de passe"
          clearButton
          onChange={
            (e)=>{
              setPassword(e.target.value)
            }
          }
        >
          <Icon material="lock" slot="media"/>
            </ListInput>
   
         <ListInput
             type="tel"
             placeholder="Votre numéro de téléphone"
             clearButton
             maxlength={8}		   
             onChange={
             (e)=>{
              setPhone('+229'+ e.target.value)
            }
          }
        >
          <Icon material="call" slot="media"/>
        </ListInput>

	    <ListInput
          type="text"
          placeholder="Votre nom"
          clearButton
          onChange={
            (e)=>{
              setLastName(e.target.value)
            }
          }
        >
          <Icon material="person" slot="media"/>
        </ListInput>
      
        <ListInput
          type="text"
          placeholder="Votre prénom"
          clearButton
            
          onChange={
            (e)=>{
              setFirstName(e.target.value)
            }
          }
        >
          <Icon material="perm_identity" slot="media"/>
        </ListInput>
        <ListItem title="Votre sexe" smartSelect
                smartSelectParams={
                   {
                    openIn:'popover',
                     closeOnSelect: true,

                   }
                }
                back = {false}  
              >
               <select 
               onChange={
                (e)=>{
                  setSexe(e.target.value)
                }
              }
               >
              <option value="Aucun choix">Aucun choix</option>

                 <option value="Masculin">Masculin</option>
                 <option value="Féminin">Féminin</option>
                 <option value="Personnalisé">Personnalisé</option>
      
                </select>
                <Icon material="swipe_down_alt" slot="media"/>
      
        </ListItem>
      
            
      
              <ListItem title="Votre Département" smartSelect
                smartSelectParams={{
                  searchbar: true,
                  closeOnSelect: true,
                  openIn: 'popup',
                  searchbarPlaceholder: 'Rechercher votre département',
                }}
                  
              >
                 <select onChange={e => {
               setDep(e.target.value)
         for (let index = 0; index < residences.length; index++) {
            if (e.target.value===residences[index].depar) {
                setCommunes(residences[index].communes)
                setDepSelected(true)
            }    
        } 
           }}  autoFocus={false}>
  
          {
            residences.map((elemnt)=>{
              return (
                <option value={elemnt.dep}>
                  {elemnt.depar}
                </option>
               
              )
            })
          }
  
              
      
                </select>
                <Icon material="room" slot="media"/>
      
              </ListItem>

    
              <ListItem title="Votre Communes" smartSelect
                smartSelectParams={{
                  openIn: 'popup',
                  closeOnSelect: true,
                  searchbar: true,
                  searchbarPlaceholder: 'Rechercher votre commune',
                }}
                  
              >
             <select onChange={e => {
         for (let index = 0; index < communes.length; index++) {
            if (e.target.value===communes[index].comm) {
                setCom(e.target.value)
                setArrondissements(communes[index].arr)
                 setComSelected(true)
            
              }    
        } 
           }}  >
  
          {
            communes.map((elemnt)=>{
              return (
                <option value={elemnt.comm}>
                  {elemnt.comm}
                </option>
               
              )
            })
          }
  
              
      
                </select>
                <Icon material="room" slot="media"/>
      
              </ListItem>
 
  

              <ListItem title="Votre Arrondissement" smartSelect
                smartSelectParams={{
                  openIn: 'popup',
                  searchbar: true,
                 closeOnSelect: true,
                  searchbarPlaceholder: 'Rechercher votre arondissement',
                }}
                  
              >
             <select onChange={e => {
                        setArr(e.target.value)
                    
                        if (firstName!==''&&lastName!=''&&phone!=''&&sexe!=''&&dep!=''&&com!=''
                        &&arr==''&&password!=''&&email!=''){
                             setValid(true)
                        }
           }}  >
  
          {
            arrondissements.map((elemnt)=>{
              return (
                <option value={elemnt}>
                  {elemnt}
                </option>
               
              )
            })
          }
  
              
      
                </select>
                <Icon material="room" slot="media"/>
      
              </ListItem>
 
    <ListItem checkbox name="demo-checkbox"   value="0" checked={conditionsAcceptees}
      onChange={
       (e)=>{
         setConditionsAcceptees(e.target.checked)
       }
     }>
     J'accepte  les
     conditions d'utilisation de l'application.
     </ListItem> 
   <ListItem>
   <Link  onClick={
    ()=>{
      f7.popup.open('.popup-settings')

    }
   } style={{color:'blue'}}>En savoir plus</Link>
   </ListItem>
  
         <Block>
          <Button fill
          disabled={!conditionsAcceptees}
          onClick={validate }>
              <Link style={{color: 'white'}}
              
              >Créer un compte prestataire</Link>
          </Button>
         </Block>
          </List>: <Loader message={'Veillez patienter'}/>
       }
         
   
          
      </Page>
    )



}

export default DevenirPesta;
