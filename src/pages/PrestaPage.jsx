import { Navbar, Page, Block, Tabs, Tab, Link, Toolbar, Icon,   Popup,BlockTitle, NavRight, View,
 Subnavbar, Searchbar, Fab, FabButtons,FabButton, Button, NavTitle, NavLeft } from 'framework7-react';
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
import PrestaProfile from '../components/PrestaProfille';
import MyTasks from '../components/MyJob';
import { getWorker } from '../components/services/User';
 
function PrestaPage(props) {
 const {myVariable,setMyVariable} = useContext(MyContext)
  const [popupOpened, setPopupOpened] = useState(false);
  const handleTabShow = (tab) => {
  };
  const worker= JSON.parse(localStorage.getItem('worker'))

      let workerId ;
  if (worker!==null) {
      workerId = worker.email.replace(/[^\w\s]/gi, "");
    }
  useEffect(() => {
   
    getWorker(worker.email)
    const messagesRef = ref(db, 'messages/'+workerId+'/nonLues');
   
    // Abonnez-vous aux modifications de la base de données Firebase Realtime
    onValue(messagesRef, (snapshot) => {
      const messsagesData = snapshot.val();
      
      if (messsagesData) {
        
                  setMyVariable(prevState => ({
              ...prevState,
              msgNlueNbrForWorker: messsagesData.nbr

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
            const demandesArray = Object.entries(demandesData).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            console.log('demandes', demandesArray)
   

          }
        });
    


        // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
        return () => {
          onValue(demandesRef, null);
        };
      }, []);
   const Statistics= ({value})=>{
  return(

<div className="badge color-red"
style={{marginTop:'-20px', marginLeft:'10px'}}
>{value}</div>

  )
}
   const WorkStatistics= ({value})=>{
  return(

<div className="badge color-red"
style={{marginTop:'-25px', marginLeft:'13px'}}
>{value}</div>

  )
}
    return (
    <Page pageContent={false}>

    <Fab position="right-center" slot="fixed"  style={{marginTop:'200px'}}
    
    >
     <Button  popupOpen=".popup-warming"
      onClick={
      ()=>{
              set( ref(db, 'messages/'+workerId+'/nonLues/nbr') , 0)

                setMyVariable(prevState => ({
              ...prevState,
              msgNlueNbrForWorker: 0

      }))
      }
     }
     >
            <Icon ios="f7:plus" md="material:chat_bubble" style={{color:'white'}}/>
            <Statistics value={myVariable.msgNlueNbrForWorker} style />
      </Button>     
    </Fab>
      
 
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
       <Icon material='work' slot='media' />
      <WorkStatistics value={myVariable.worksNbr} style />

        <span style={{textTransform:'none',marginTop:'10px'}}>Mon travail</span>

      </Link>
    </Toolbar>
       <Navbar>
           <NavLeft>
             <Button popupOpen = '.popup-contacts'>
              <img src={worker.profile} alt="" style={{width: '30px' , height:'30px', borderRadius:'50%'}} />
             </Button>
           </NavLeft>
           <NavTitle>
            <h4 style={{textAlign: 'center'}}> 
             {worker.lastName }  {worker.firstName }
            </h4> 
           </NavTitle>
        </Navbar>

    <Tabs swipeable >
      <Tab id="tab-1" className="page-content" tabActive >
        
       <Tasks />
      </Tab>
      <Tab id="tab-2" className="page-content" onTabShow={handleTabShow}>
        <br /><br /><br />
        <ConfigSettings  />
      </Tab>
      <Tab id="tab-3" className="page-content">
       <MyTasks />
      </Tab>
    </Tabs>


       <Popup
        className="popup-warming"
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar title="Messages">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>
          <ChatPresta />
        </Page>
      </Popup>
        <Popup
        className="popup-contacts"
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar title="Mon Profile">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>
          <PrestaProfile />
        </Page>
      </Popup>
  </Page>)
}

export default PrestaPage;