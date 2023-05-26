import React, { useState } from 'react';
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
import { auth } from '../components/backend';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



const user = JSON.parse(localStorage.getItem('user'))
 const  Confirm = () => {
const [mailCode, setMailCode] = useState(null);
const [numCode , setNumCode] = useState(null)
const [selected, setSelected]= useState(false)
 const handlePhotoChange = () => {
    // Ouvrir l'explorateur de fichiers pour sélectionner une image
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
      const file = input.files[0];

      // Télécharger la nouvelle image dans le stockage Firebase
      uploadBytes(userPhotoRef, file).then(() => {
        // Récupérer l'URL de téléchargement de la nouvelle image
        getDownloadURL(userPhotoRef).then(url => {
          // Mettre à jour l'état de l'image de l'utilisateur
          this.setState({ photo: url });
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    });
    input.click();
     }
  return (
    <Page>

 
 
    <Page>
    <Toolbar style={{backgroundColor: 'rgb(2, 2, 48)',padding:'40px',textAlign: 'center'}}>
        <Link href='/'
        style={{color:'white'}}>
     <Icon material="arrow_back" slot="media"/>
    
        </Link>
        <div className="label">
           <span style={{TextAlign: 'center',}}>Page de confirmation</span>
        </div>
    </Toolbar><br /><br /><br /><br />
      <List form>
         <Block>
          <h5>Confirmer vos coordonnées de connexion</h5>
         </Block>

        <ListInput
          label="Code de confirmation de votre adresse mail"
          type="number"
          placeholder="968532"
          value={mailCode}
          onInput={(e) => {
            setMailCode(e.target.value);
          }}
        />
        <ListInput
          label="Code de confirmation de votre numéro de téléphone "
          type="number"
          placeholder="365214"
          value={numCode}
          onInput={(e) => {
            setNumCode(e.target.value);
          }}
        />
         <Block>
          <h5>Confirmer votre identité avec une pièce valide</h5>
         </Block>
          <ListItem title="Choisir une pièce pour la confirmation" smartSelect
                
                back = {false}  
              >
               <select 
               onChange={
                (e)=>{
                  setSexe(e.target.value)
                  selected(true)
                }
              }
               >
                 <option value="Carte d'identité nationale">Masculin</option>
                 <option value="Carte Biométrique">Carte Biométrique</option>
                 <option value="CIP">CIP</option>
                 <option value="NPI">NPI</option>
    
                </select>
      
        </ListItem>
        <Button onClick={
          ()=>{
            handlePhotoChange()
          }
        }>
          Importer le fichier de votre pièce
        </Button>
      </List>
       
      
      <List>
           <Button fill 
         onClick={
          ()=>{
                  f7.views.main.router.navigate('/demandeurCompte/')

          }
         }
           >Confirmer</Button>       
      </List>
    </Page>
    </Page>
  );
};


export default Confirm;