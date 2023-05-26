import { Navbar, Page, Block, Tabs, Tab, Link, Toolbar, Icon,   Popup,BlockTitle, NavRight, View,
 Subnavbar, Searchbar, Fab, FabButtons,FabButton, Button, NavLeft, NavTitle } from 'framework7-react';
import React, { useContext, useEffect, useState } from 'react';
import '../css/presta.scss'
import '../css/style.scss'


import { heartOutline } from 'ionicons/icons';
import { db } from '../components/backend';
import { onValue, ref, set } from 'firebase/database';
import Tasks from '../components/TasksForPresta';
import ChatBox from '../components/ChatBox';
import MyContext from '../../contextes/appContext';
import ConfigSettings from '../components/Setting';
import ChatPresta from '../components/ChatPresta';
import Historique from './Historique';
import UserProfile from './myProfile';
import DemandeForm from './demandForm';
import Details from './Details';
import Buttons from './Buttons';
import { getUser } from './services/User';
 
function MyCompte(props) {
 const {myVariable,setMyVariable} = useContext(MyContext)
  const [popupOpened, setPopupOpened] = useState(false);
  const [demand , setDemand] = useState()
    const user = JSON.parse(localStorage.getItem('user'))

      let userId ;
  if (user!==null) {
      userId = user.email.replace(/[^\w\s]/gi, "");
    }
    let demandesArray  = []
  const handleTabShow = (tab) => {
  };
 useEffect(()=>{

  getUser(localStorage.getItem('connected'))
 },[])
  useEffect(() => {
   

    const messagesRef = ref(db, 'messages/'+userId+'/nonLues');
   
    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(messagesRef, (snapshot) => {
      const messsagesData = snapshot.val();
      
      if (messsagesData) {
        
                    setMyVariable(prevState => ({
              ...prevState,
              msgNlueNbr: messsagesData.nbr

      }))
      }
    });

    // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
    return () => {
      onValue(messagesRef, null);
    };
  }, []);
   useEffect(() => {
    
       const allDemandRef = ref(db, 'demandes/');
       
        // Abonnez-vous aux modifications de la base de données Firebase Realtime
         onValue(allDemandRef, (snapshot) => {
           const demandesData = snapshot.val();
          
           if (demandesData) {

          //  setLoaded(true)
            // Convertir les données de la base de données en tableau
         

          }
        });


      //Ici c'est pour récupérer mes demandes 
        const demandesRef = ref(db, 'AllDemandes/');
       
        // Abonnez-vous aux modifications de la base de données Firebase Realtime
        onValue(demandesRef, (snapshot) => {
          const demandesData = snapshot.val();
          
          if (demandesData) {

            // Convertir les données de la base de données en tableau
             demandesArray = Object.entries(demandesData).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            console.log('demandes', demandesArray)
            setDemand(demandesArray[1])

            console.log(demand)

          }
        });
    


        // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
        return () => {
          onValue(demandesRef, null);
};  }, []);

useEffect(()=>{},

[])
   const Statistics= ({value})=>{
  return(

<div className="badge color-red"
style={{marginTop:'-20px', marginLeft:'10px'}}
>{value}</div>

  )
}
    return (
    <Page pageContent={false}>

    <Fab position="right-center" slot="fixed"  style={{marginTop:'200px'}}
    
    >
     <Button  popupOpen=".demo-popup" onClick={
      ()=>{
              set( ref(db, 'messages/'+userId+'/nonLues/nbr') , 0)

                setMyVariable(prevState => ({
              ...prevState,
              msgNlueNbr: 0

      }))
      }
     }>
            <Icon ios="f7:plus" md="material:chat_bubble" style={{color:'white'}}/>
            <Statistics value={myVariable.msgNlueNbr} style />
      </Button>     
    </Fab>
      {
        myVariable.showTlbr ? 
 
    <Toolbar bottom tabbar >
      <Link tabLink="#tab-1" tabLinkActive className='link-style'>
        <Icon material='home' slot='media' />
      <span style={{textTransform:'none'}}>Acceuil</span>

      </Link>
      <Link tabLink="#tab-2"  className='link-style'>
        <Icon material='settings' slot='media' />
         <span style={{textTransform:'none'}}>Paramètres</span>

      </Link>
      <Link tabLink="#tab-3"  className='link-style'>
      <Icon material='send' slot='media' />
        <span style={{textTransform:'none'}}>Demander</span>

      </Link>
    </Toolbar>: null

    }
    <Tabs swipeable >
      <Tab id="tab-1" className="page-content" tabActive >
        <Navbar>
           <NavLeft>
             <Button popupOpen = '.demo-popup-swipe'>
              <img src={user.profile} alt="" style={{width: '30px' , height:'30px', borderRadius:'50%'}} />
             </Button>
           </NavLeft>
           <NavTitle>
            <h4 style={{textAlign: 'center'}}> 
             {user.lastName }  {user.firstName }
            </h4> 
           </NavTitle>
        </Navbar>
          
        <br /><br />
       <Historique />
      </Tab>
      <Tab id="tab-2" className="page-content" onTabShow={handleTabShow}>
          <Navbar>
           <NavLeft>
             
           </NavLeft>
           <NavTitle>
            <h4 style={{textAlign: 'center'}}> 
            Paramètres de sécurité
            </h4> 
           </NavTitle>
        </Navbar>
        <ConfigSettings  />
      </Tab>
      <Tab id="tab-3" className="page-content">
       <Navbar title='Nouvelle demande'></Navbar>
       <DemandeForm />
      </Tab>
    </Tabs>


       <Popup
        className="demo-popup"
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar title="Messages">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>
          <ChatBox />
        </Page>
      </Popup>

      <Popup
        className="demo-popup-swipe"
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar title="Mon profile">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>
          <UserProfile />
        </Page>
      </Popup>


  </Page>)
}

export default MyCompte;