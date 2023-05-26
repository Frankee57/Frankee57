import { onValue, push, ref, remove, set } from 'firebase/database';
import { ListItem,List, Page, Toolbar, Link, Icon,Block,Badge,Popup, Preloader, PageContent ,NavRight  ,Messagebar,Popover, Button, Navbar, Sheet, f7 , NavTitle ,NavLeft} from 'framework7-react';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../contextes/appContext';
import { db } from './backend';
import  Loader from './loader';
import '../css/loader.scss'
import '../css/details.scss'
import { allDemandesSise, logo } from './services/dataCenter';

import DetailsForPresta, { timeFormat } from './DetailsForPresta';
const Nothing = ()=>{
  return   <div className="load nothing">
  <div className="loader">
     Aucune demande disponible
  </div>
</div>
}

function MyTasks(props) {
    let postule ;
     let worker ;
     if (localStorage.getItem('worker')!==undefined) {
      worker = JSON.parse(localStorage.getItem('worker'))
     }
    const [demandes,setDemandes]= useState([])
    const [open, setOpen] = useState(false)
    const { myVariable, setMyVariable } = useContext(MyContext);
    const [loaded, setLoaded] = useState(false)
    const [demand,setDemand] = useState(null)
    const [doneNbr , setDoneNbr ]= useState(0)

    let displayTime;
    const userProfile = localStorage.getItem('userProfile')
/*---------------------Récuperation des demandes des utilisateure-------------------*/ 
   useEffect(() => {



        const demandesRef = ref(db, 'workers/'+worker.key+'/myTasks');

       
        onValue(demandesRef, (snapshot) => {
          const demandesData = snapshot.val();
          
          if (demandesData) {
              
            const demandesArray = Object.entries(demandesData).map(([key, value]) => ({
              id: key,
              ...value,
            }));
                 let index = 0

            demandesArray.map((task)=>{
                console.log(task)
               if (task.done==undefined) {
                 index = index+1
                  
                setDoneNbr(index)
               }
            })
            setDemandes(demandesArray.reverse());
                  setMyVariable(prevState => ({
              ...prevState,
              worksNbr:  doneNbr
      }))
          if (demandesArray.length==0) {
            setLoaded(false)
          }
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
          
          >Mes tâches à faire  {allDemandesSise}</div>
    
            {
              demandes.map((demande)=>{
              
            
                  
                const messageTime = new Date(demande.dateEnvoi);
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
                             <Button popupOpen = '.popup-privacy-policy'
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
                    text= {'Un client a demandé un service de '+ demande.serviceDemande+ 'depuis'+ demande.auteur.arr +
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
          
           
      <Popup className='popup-privacy-policy demande-details' >
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
                     <div>
             <div class="request-details">
         <div class="request-detail">
        <h2 class="request-detail-title">Date</h2>
        <p class="request-detail-value">
          {timeFormat(demand.dateEnvoi)}
        </p>
       </div>
       <div class="request-detail">
        <h2 class="request-detail-title">Service(s) demandé(s)</h2>
        <p class="request-detail-value">
          {
          
          demand.serviceDemande.map((ser)=>{
            return(
              <span>
                {ser} <br />
              </span>
            )
          })
          
          }
        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">Instructions</h2>
        <p class="request-detail-value" >
          {demand.detail}
        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">Lieu de demande</h2>
        <p class="request-detail-value">
          {demand.auteur.com}
        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">
          Demandeur
        </h2>
        <p class="request-detail-value">
          {demand.auteur.firstName}   {demand.auteur.lastName} 

        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">Contacts du demandeur</h2>
        <p class="request-detail-value">
          {demand.auteur.phone}
        </p>
      </div>
    </div>
    
 </div>
 </div>
   
    
    
<Button 
onClick={
    ()=>{
     const taskRef = ref(db, 'workers/'+worker.key+'/myTasks/'+demand.id+'/done');

       push(ref(db,'dones/') , {
        date: (new Date()).toISOString(),
        task: demand,
        worker: worker
       } )

       set(taskRef, true).then(
        ()=>{
            f7.dialog.alert('','Merci beaucoup pour le travail')
        }
       )
    }
}

fill style={{textTransform:'none'}}>J'ai déjà excécuté le travail</Button>
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
            loaded ?  <Loader message={'Veillez patienter...'}/>: <Nothing />
           }
         </div>
        )
      }
   }





export default MyTasks;