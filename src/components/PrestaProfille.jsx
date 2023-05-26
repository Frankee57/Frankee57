import React, { Component } from 'react';
import { Page, Navbar, Block, BlockTitle, List, ListItem, Button, Icon ,Link,PageContent,Sheet} from 'framework7-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { userProfile } from './services/dataCenter';
import { push, ref as databaseRef  , onValue, set, get } from 'firebase/database';
import { db } from './backend';

const worker = JSON.parse(localStorage.getItem('worker'))
let workerId = ''
if (worker!=null) {
   workerId= worker.email.replace(/[^\w\s]/gi, "");

}
const firebaseConfig = {
  apiKey: "AIzaSyA9A7smM7BULTiQyMZ7Y1UxqM3S-ZhYgZ4",
  authDomain: "oxygene-6e5c5.firebaseapp.com",
  databaseURL: "https://oxygene-6e5c5-default-rtdb.firebaseio.com",
  projectId: "oxygene-6e5c5",
  storageBucket: "oxygene-6e5c5.appspot.com",
  messagingSenderId: "25944032722",
  appId: "1:25944032722:web:c1339242d92b5c16cb740b",
  measurementId: "G-QD2T1Y04BN"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const userPhotoRef = ref(storage, `user_photos/${workerId}.jpg`);
let userPic = userProfile;
class PrestaProfile extends Component {
  constructor(props) {
    super(props);

 
if (localStorage.getItem('worker')!==null) {
      this.state = JSON.parse(localStorage.getItem('worker'))

}
  }

  componentDidMount() {
    // Récupérer l'URL de téléchargement de l'image de l'utilisateur
    getDownloadURL(userPhotoRef).then(url => {
      this.setState({ photo: url });
      if (localStorage.getItem('workerProfile')==undefined) {
        userPic = userProfile;
     
         }else{
       userPic = localStorage.getItem('workerProfile');

      }
      localStorage.setItem('workerProfile', url)

    }).catch(error => {
      userPic = userProfile
    });
  }

  handlePhotoChange = () => {
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
          localStorage.setItem('workerProfile', url)
          userPic  = url
           set(databaseRef(db, 'workers/' + worker.userKey+'/profile'  ),  url)
           // Pour mettre à jour les données de l'utilisateur en local
           worker.profile = url
           localStorage.setItem('worker', JSON.stringify(worker))
        }).catch(error => {
          console.log(error);
        });
      }).catch(error => {
        console.log(error);
      });
    });
    input.click();
  }

  handleLogout = () => {
   localStorage.setItem('worker',JSON.stringify(worker))
    localStorage.removeItem('connectedAsWorker');
    window.location.reload();
  }

  render() {
    return (
      <Page>
     
        
        <Block>

      <div className="profile-image-container">
        <div class="profile-image" style={{backgroundImage: 'url('+userPic+')'}} data-alt="Photo de profil"></div>
      </div>
      <div style={{marginTop:'-4px'}}>
        <Icon material='mail' slot='media'></Icon>
        <span style={{fontSize:'15px',fontWeight:'bold',marginLeft:'10px'}}>{this.state.email}</span>
      </div>
     <div style={{marginTop:'3px'}}>
        <Icon material='call' slot='media'></Icon>
        <span style={{fontSize:'15px',fontWeight:'bold', marginLeft:'10px'}}>{this.state.phone}</span>
      </div>
        </Block>

        <BlockTitle>Mes informations</BlockTitle>
        <List>
          <ListItem title="Nom" after={this.state.lastName} />
          <ListItem title="Prénom" after={this.state.firstName} />
          <ListItem title="Departement" after={this.state.dep} />
          <ListItem title="Commune" after={this.state.com} />
          <ListItem title="Arrondissemnt" after={this.state.arr} />
        </List>

        <Block>
          <Button fill round onClick={this.handlePhotoChange}>Changer sa photo</Button>
          <Button fill round color="red" sheetOpen = '.demo-sheet-swipe-to-close'>Se déconnecter</Button>
        </Block>

        
            <Sheet
        className="demo-sheet-swipe-to-close"
        style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }}
        swipeToClose
        backdrop
      >
        <PageContent>
         <List>
          <h3 style={{textAlign:'center'}}>Voulez-vous continuer ?</h3>
         <Button  
         
          >
            <Link
          onClick={this.handleLogout}
             sheetClose
            
            
            >oui</Link>
          </Button>
          <Button  
         
          >
            <Link sheetClose>Non</Link>
          </Button>
         </List>
        </PageContent>
            </Sheet>
      </Page>
    );
  }
}

export default PrestaProfile;
