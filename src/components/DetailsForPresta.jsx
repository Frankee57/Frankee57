import { onValue, push, ref, remove, set } from 'firebase/database';
import { ListItem,List, Page, Toolbar, Link, Icon,Block,Badge,Popup, Preloader, PageContent ,NavRight  ,Messagebar,Popover, Button, Navbar, Sheet, f7 } from 'framework7-react';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../contextes/appContext';
import { db } from './backend';
import  Loader from './loader';
import '../css/loader.scss'
import '../css/details.scss'
import { allDemandesSise, logo } from './services/dataCenter';
import ModifForm from './DemandModif';

import '../css/details.scss'

let time ;
let displayTime;
 let worker ;
let workerId ;
if (localStorage.getItem('worker')!==null) {
    worker = JSON.parse(localStorage.getItem('worker')) 
     workerId = worker.email.replace(/[^\w\s]/gi, "");
}


export const   timeFormat=(date)=>{
 

    const messageTime= new Date(date);
    const now = new Date();
    // eslint-disable-next-line max-len
    const isSameDay = messageTime.getDate() === now.getDate() && messageTime.getMonth() === now.getMonth() && messageTime.getFullYear() === now.getFullYear();
   time = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
     date = messageTime.toLocaleDateString();
    if (now - messageTime < 24 * 60 * 60 * 1000) {
      if (isSameDay) {
        const timeString = messageTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
       displayTime = timeString;
      } else {
      displayTime= 'Hier';
                    }
    } else {
      const dateString = messageTime.toLocaleDateString();
      displayTime= dateString;
      if (messageTime==='Invalid Date') {
     displayTime= `à l'instant`;

      }
    }

return displayTime;
  }

const  DetailsForPresta = ({demand})=> {
  const [iamPostule , setIamPostule ] = useState(false)

  const {myVariable , setMyVariable} = useContext(MyContext)
  useEffect(()=>{
     if (demand.postulants!==undefined) {
       setIamPostule(true)
       console.log(demand.postulants)
     }

  },[])
  const postuler = ()=>{
   set(ref(db,'acceptedDemands/'+demand.id+'/postulants/'+workerId),
                 {
                  date: (new Date()).toDateString(),
                  worker: worker,
                 }
     )  
     
  }
  if (demand!==undefined) {
      return (
        <div>
             <div class="request-details">
         <div class="request-detail">
        <h2 class="request-detail-title">Date</h2>
        <p class="request-detail-value">
          {timeFormat(demand.body.dateEnvoi)}
        </p>
       </div>
       <div class="request-detail">
        <h2 class="request-detail-title">Service(s) demandé(s)</h2>
        <p class="request-detail-value">
          {
          
          demand.body.serviceDemande.map((ser)=>{
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
        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">Lieu de demande</h2>
        <p class="request-detail-value">
          {demand.body.com} ,     {demand.body.arr}
        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">
          Demandeur
        </h2>
        <p class="request-detail-value">
          {demand.body.auteur.firstName}   {demand.body.auteur.lastName} 

        </p>
      </div>
      <div class="request-detail">
        <h2 class="request-detail-title">Contacts du demandeur</h2>
        <p class="request-detail-value">
          {demand.body.auteur.phone}
        </p>
      </div>
    </div>
    <div className='boutons'>
      
          <Button fill onClick={postuler}>
      Je veux exécuter la tâche
       </Button>: null
      
    </div>
 </div>
    );
  }
}

export default DetailsForPresta;