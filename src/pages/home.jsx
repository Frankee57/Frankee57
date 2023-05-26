import React, { useEffect, useState ,useContext } from 'react';
import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  NavTitleLarge,
  NavRight,
  Link,
  Toolbar,
  Block,
  BlockTitle,
  List,
  ListItem,
  Row,
  Col,
  Button,
  Icon,
  Popover,
  Panel,
  f7,
  f7ready,
  Popup,
  LoginScreen,
  Subnavbar,
  Searchbar
} from 'framework7-react';
import MyCompte from '../components/MyCompte';
import { logo } from '../components/services/dataCenter';
import ListeTachesDomestiques from '../components/plusFrequents';
import MyContext from '../../contextes/appContext';

import '../css/home.scss'
import DemandeForm from '../components/demandForm';
import Confirm from './Confirm';
import PrestaPage from './PrestaPage';
import DemandeFormPage from './demande-form';
import Login from './loginSrenn';
import DevenirPesta from './devenirPresta';
import ConfigSettings from '../components/Setting';
import OtherAccount from './otherAccount';
import Details from './Details';
import ServicePage from './services';
const styles = {
  NavBar:{
   backgroundColor:'#c5eaf6',
   display: 'flex',
  padding: '7px',
  top: 0,
  position: 'sticky',
  overflow: 'hidden',
 boxShadow: '2px 3px 3px rgb(62, 56, 56)'

},

Block:{
  backgroundColor: 'white',
  fontSize:'17px',
  padding: '5px',
  textAlign: 'center'
}


}
const userProfile = localStorage.getItem('userProfile')
let userCreated 
let lien = {
  text: '',
  link:''
}

let workerExist = ' Travailler chez Oxygene'

const me = JSON.parse(localStorage.getItem('user'))

const HomePage = () => {
   let otherAccountExist = false
  for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  // Vérifier si la clé contient le mot '@'
  if (key.includes('@')) {
    // Ajouter la valeur correspondante au tableau
     otherAccountExist = true

  }
}
  const { myVariable, setMyVariable } = useContext(MyContext);
   let disabled
   let connectedAsWorker;
  if (localStorage.getItem('user')==null) {
    lien.text = 'créer un compte'
    userCreated = {
      name: 'Oxygène DARSAF',
      email: 'oxygenedarsaf@gmail.com',
      pic: logo
    }
  }else{
    lien.text= "se connecter"
    const me = JSON.parse(localStorage.getItem('user'))
    userCreated = {
      name: me.lastName+'  '+ me.firstName,
      email: me.email,
      pic: userProfile
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.getItem('connected')
  const worker = localStorage.getItem('connectedAsWorker')
  const workerAccount = localStorage.getItem('worker')
  const [creatWorker , setCeatWorker] = useState()
if (worker!==null) {
    connectedAsWorker = true

}else{
        connectedAsWorker = false

  
}
if (workerAccount!==null) {
  workerExist = 'Voir les tâches à faire'
}else{
  workerExist = ' Travailler chez Oxygene'
}

  const [link,setLink] = useState('')

  const handleOpen = () => {
    setIsOpen(true);
  }
  const handleClose = () => {
    setIsOpen(false);
  }
 if (user==null) {
  if (connectedAsWorker==false) {
    
  
  return (
    <Page name="home">
    {
      myVariable.demandForm ?
     <div>
      <Navbar>
        <NavLeft 
         
        >
         <Button onClick={
          ()=>{
              setMyVariable(prevState => ({
        ...prevState,
        demandForm: false
    }))
          }
         }>
           <Icon material="arrow_back" slot="media" >
             
          </Icon>
         </Button>
        </NavLeft>
        <NavTitle>
          Nouvelle demande
        </NavTitle>
      </Navbar>
       <DemandeForm />
     </div>: 

      <Page>
    <Panel opened={isOpen} onPanelBackdropClick={handleClose} left >
        <div className="panel-header">
        <div className="text-center" >
        <div className="profile-image-container">
        <div class="profile-image" style={{backgroundImage: 'url('+userCreated.pic+')'}} data-alt="Photo de profil"></div>
         </div>
        </div>
          <div className="panel-header-info">
            <div className="name">
              {userCreated.name}
            </div>
            <div className="email">
              {userCreated.email}
            </div>
          </div>
        <List>
       
        </List>
        </div>
      
        <List>
        <ListItem  
          onClick={
            ()=>{
              const me = JSON.parse(localStorage.getItem('user'))

              if (me!==null) {
                f7.popup.open('.popup-signup')
              handleClose()
              setCeatWorker(false)
              }else{
                f7.popup.open('.popup-tutorial')
                handleClose()
              }
            }
          }
          >
            <Icon material='person' slot='media' />
            <Link>Se connecter</Link>
          </ListItem>
          <ListItem  
          onClick={
            ()=>{
              handleClose()
                           f7.popup.open('.popup-settings')

            }
          }
          >
            <Icon material='lock' slot='media' />
            <Link 
            >Paramètres de sécurité</Link>
          </ListItem>
         
          <ListItem >
          <Icon material='add' slot='media' />
            <Link
            onClick={
              ()=>{
                handleClose()
                setCeatWorker(false)
                f7.popup.open('.popup-tutorial')
                 localStorage.removeItem('connected')
                 localStorage.setItem('other', JSON.stringify(me))
              }
            }
            >Ajouter un compte</Link>
          </ListItem>
         
        </List>
        <List>
          {
            otherAccountExist ?

        
      <ListItem>
        <div className="profile-image-container" style={{width:'30px',height:'30px'}}>
        <div class="profile-image" style={{backgroundImage: 'url('+userProfile+')'}} data-alt="Photo de profil"></div>
         </div>
          <Link style={{marginLeft:'-20px'}}
          onClick = {
            ()=>{
              handleClose()
               f7.popup.open('.popup-forgot-password')

            }
          }
          >
          Choisir un compte
          </Link>
          <Icon material='chevron_right' style={{opacity:'0.6'}}/>
        </ListItem>: null
            }
        </List>
      </Panel>

      <Popup className='popup-tutorial'>
       <Page>
        <Navbar>
          <NavLeft >
             <Button popupClose>
                  <Icon material="arrow_back" slot="media"/>

             </Button>
          </NavLeft>
          <NavTitle>
            Créer un compte 
          </NavTitle>
        </Navbar>
        {
          creatWorker ?
          <DevenirPesta />
          : <DemandeFormPage />
        }
       </Page>
      </Popup>

   <Popup className='popup-signup
'>
       <Page>
        <Navbar>
          <NavLeft >
             <Button popupClose>
                  <Icon material="arrow_back" slot="media"/>

             </Button>
          </NavLeft>
          <NavTitle>
            Se connecter  
          </NavTitle>
          <NavRight>
            <Button fill
            
             style={
              {
                textTransform:'none'
              }
            }
            onClick={
              ()=>{
                 f7.popup.open('.popup-tutorial')

              }
            }
            
            >créer un compte</Button>
          </NavRight>
        </Navbar>
        <Login />
       </Page>
      </Popup>

 <Popup className='popup-settings

'>
       <Page>
        <Navbar>
          <NavLeft >
             <Button popupClose>
                  <Icon material="arrow_back" slot="media"/>

             </Button>
          </NavLeft>
          <NavTitle>
            Les paramètres de sécurité
          </NavTitle>
        </Navbar>
        <ConfigSettings />
       </Page>
      </Popup>


       <Popup className='popup-forgot-password'>
       <Page>
        <Navbar>
          <NavLeft >
             <Button popupClose>
                  <Icon material="arrow_back" slot="media"/>

             </Button>
          </NavLeft>
          <NavTitle>
            Mes comptes 
          </NavTitle>
        </Navbar>
        <OtherAccount />
       </Page>
      </Popup>
 <Popup className='popup-error

'>
       <Page>
        <Navbar>
          <NavLeft >
             <Button popupClose>
                  <Icon material="arrow_back" slot="media"/>

             </Button>
          </NavLeft>
          <NavTitle>
            Oxygene
          </NavTitle>
        </Navbar>
        <Details />
       </Page>
      </Popup>



 <Popup className='popup-confirmation

'>
       <Page>
        <ServicePage />
       </Page>
      </Popup>
    {/* Top Navbar */}



     <Navbar style={{ '--f7-navbar-bg-color': 'white' }}>
      <NavLeft>
        <Link onClick={handleOpen}>
        <Icon material='menu' slot='media' />
        </Link>
        <NavTitle 
        style={{fontWeight:'bold'}}
        >Oxygene</NavTitle>
        <NavRight>
        <Link        onClick={
          ()=>{
               f7.popup.open('.popup-confirmation')

          }
        }
>
        <Icon material='search' slot='media' />
        </Link>        
        
         <Button fill 
         onClick={
            ()=>{

                 f7.popup.open('.popup-signup')
           
            }
          }
         
         style={
          {
            marginLeft: '20px',
            textTransform:'none'
          }
          
         }>Se connecter</Button>
        </NavRight>
      </NavLeft>
     </Navbar>

 

    {/* Page content */}
    <Block strong style={styles.Block}>
      <h2  style={{textAlign: 'center'}}
      >Qu'avez vous besoin aujourd'hui ?</h2>
      <p>
      Retrouvez  facilement quelqu'un pour vous effectuer vos tâches de maison
    
      <Link 
      onClick={
        ()=>{
            f7.popup.open('.popup-error')

        }
      }
      style={{color:'blue'}} >
        Savoir plus
      </Link>
      </p>

  <div className="boutons" style={{display: 'flex', justifyContent: 'space-between'}}>


          <Link className='bouton' 
           onClick={
            ()=>{
              if (worker==null) {
                 f7.popup.open('.popup-tutorial')
                 setCeatWorker(true)
              }else{
                 f7.views.main.router.navigate('/prestaPage/')

              }
            }
           }

          style={{textTransform: 'none', }}>
           {workerExist}
           </Link>
          
          <Link className='bouton'
          onClick={

            ()=>{
             
              if (localStorage.getItem('user')==null) {
                f7.popup.open('.popup-tutorial')
                setCeatWorker(false)
              }else{
                f7.views.main.router.navigate('/demandeurCompte/')
                localStorage.setItem('connected', me.email)
              }
            }
          }
                    href={link}

           raised outline style={{textTransform: 'none', }}>
              Demander un service
            </Link>
       
</div>


{/*Les sections des taces domestiques*/ }
    </Block>
      <h3 style={{padding: '5px'}}> Plus recherchés</h3>
        <ListeTachesDomestiques 
        />    
    </Page>
    }

  
  </Page>
  )
  }else{
    return(
      <PrestaPage />
    )
  }
 }else{
  return(
    <MyCompte />
  )
 }


  
}
 

export default HomePage;