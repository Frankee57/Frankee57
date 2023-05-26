import { onValue, push, ref, remove, set } from 'firebase/database';
import { ListItem,List, Page, Toolbar, Link, Icon,Block,Badge,Popup, Preloader, PageContent ,NavRight  ,Messagebar,Popover, Button, Navbar, Sheet, f7 , NavTitle ,NavLeft} from 'framework7-react';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../contextes/appContext';
import { db } from './backend';
import  Loader from './loader';
import '../css/loader.scss'
import '../css/details.scss'
import { allDemandesSise, logo } from './services/dataCenter';

import DetailsForPresta from './DetailsForPresta';
const Nothing = ()=>{
  return   <div className="load nothing">
  <div className="loader">
    <Popover />
     Aucune demande disponible
  </div>
</div>
}

function Tasks(props) {
    let postule ;
     let worker ;
     let workerId ; 
     if (localStorage.getItem('worker')!==undefined) {
      worker = JSON.parse(localStorage.getItem('worker'))
         workerId= worker.email.replace(/[^\w\s]/gi, "");

     }
    const [demandes,setDemandes]= useState([])
    const [open, setOpen] = useState(false)
    const { myVariable, setMyVariable } = useContext(MyContext);
    const [loaded, setLoaded] = useState(false)
    const [demand,setDemand] = useState(null)
   

    let displayTime;
    const userProfile = localStorage.getItem('userProfile')
/*---------------------Récuperation des demandes des utilisateure-------------------*/ 
   useEffect(() => {



        const demandesRef = ref(db, 'acceptedDemands/');
       
       
        onValue(demandesRef, (snapshot) => {
          const demandesData = snapshot.val();
          
          if (demandesData) {

            const demandesArray = Object.entries(demandesData).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            setDemandes(demandesArray.reverse());
            console.log(demandesArray)
            console.log('demandesValidées', demandesArray)
                  setMyVariable(prevState => ({
              ...prevState,
              demandNbr: demandesArray.length
      }))

          }
        });
    


        // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
        return () => {
          onValue(demandesRef, null);
        };
      }, []);
  


      if (demandes.length!=0) {
        return (
          
          <List mediaList >
             
          <div style={{padding: '10px', fontWeight: 'bold'}}
          
          >Demandes récentes {allDemandesSise}</div>
    
            {
              demandes.map((demande)=>{
              
                  
  
                const messageTime = new Date(demande.body.dateEnvoi);
                const now = new Date();
                const isSameDay = messageTime.getDate() === now.getDate() && messageTime.getMonth() === now.getMonth() && messageTime.getFullYear() === now.getFullYear();
            
                if (now - messageTime < 24 * 60 * 60 * 1000) {
                  if (isSameDay) {
                    const timeString = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    displayTime = timeString
                  } else {
                    displayTime= 'Hier'
                                }
                } else {
                  const dateString = messageTime.toLocaleDateString();
                  displayTime= dateString
                  if (messageTime=='Invalid Date') {
                    displayTime= "à l'instant"
    
                  }
                }
             
               
                
                      return(
                  <ListItem 
                       badge={
                       (
                        <Badge color="white">
                           {
                            !postule ?
                             <Button popupOpen = '.popup-gallery'
                            onClick={
                          ()=>{
                          setOpen(true)
                          setDemand(demande)
                      
                      }
                  }
                            
                             fill style={{color: 'black',
                           fontWeight: 'bold',
                           fontSize: '16px',

                           }}>
                            ouvrir
                           </Button>: null
                           }                      
                          </Badge>
                      )
                    }
                    badgeColor = 'white'
                    title= {displayTime} 
                    text= {'Un client a demandé un service de '+ demande.body.serviceDemande+ 'depuis'+ demande.body.arr +
                    'Cliquer pour voir plus de détails'}
                  >
                   
                    <img
                      src={logo}
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      slot="media"
                    />
                  </ListItem>
              )
              
              })
           }
          
           
      <Popup className='popup-gallery demande-details' >
            <Page>
                <Navbar>
              <NavLeft >
                 <Link popupClose>
                 <Icon material="arrow_back" slot="media"/>

                 </Link>
              </NavLeft>
              <NavTitle>Les détails de la demandes </NavTitle>
            </Navbar>
            {
              open ?
          <div className="contenu" >
       
              <Block>
                  <div class="container">
           
                     <DetailsForPresta demand={demand} />

                  </div>
   
    
    

               </Block>





           </div>               

              :null
            }

            </Page>


           </Popup>

    </List>
      );
      }else{
        return(
         <div className='loader'>
           {
            !loaded ?  <Loader message={'Veillez patienter...'}/>: <Nothing />
           }
         </div>
        )
      }
   }





export default Tasks;