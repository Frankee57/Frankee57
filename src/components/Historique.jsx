import { onValue, push, ref, remove, set } from 'firebase/database';
import { ListItem,List, Page, Toolbar, Link, Icon,Block,Badge,Popup, Preloader, PageContent ,NavRight  ,Messagebar,Popover, Button, Navbar, Sheet, f7, Panel, NavLeft, NavTitle } from 'framework7-react';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../contextes/appContext';
import { db } from './backend';
import  Loader from './loader';
import '../css/loader.scss'
import '../css/details.scss'
import { allDemandesSise, logo } from './services/dataCenter';
import ModifForm from './DemandModif';
import Evaluation from './Evaluation';
import Details from './Details';
import Buttons from './Buttons';
const Nothing = ()=>{
  return   <div className="load nothing">
  <div className="loader">
      Vous n'avez effectué aucune demande.
      Veiller le faire en cliquant sur le bouton + 
  </div>
</div>
}

function Historique(props) {
    const [demandes,setDemandes]= useState([])
    const [open, setOpen] = useState(false)
    const { myVariable, setMyVariable } = useContext(MyContext);
    const user = JSON.parse(localStorage.getItem('user'))
    const [loaded, setLoaded] = useState(false)
    const [demand,setDemand] = useState(null)
    const [comment , setComment] = useState('');
    let myComment ;
    let userId ;
      const [isOpen, setIsOpen] = useState(false);
 



   const handleOpen = () => {
    setIsOpen(true);
    }
  const handleClose = () => {
    setIsOpen(false);
  }
    function choise(star1, star2, star3 , star4 , star5) {
      
    }
    if (user!==null) {
      userId = user.email.replace(/[^\w\s]/gi, "");
    }
    let displayTime;
    let sentNbr = 0 ;
    const userProfile = localStorage.getItem('userProfile')
 
       useEffect(() => {
       const allDemandRef = ref(db, 'demandes/');
       
      
         onValue(allDemandRef, (snapshot) => {
           const demandesData = snapshot.val();
          
           if (demandesData) {

            setLoaded(true)
         

          }
        });


        const demandesRef = ref(db, 'demandes/'+userId);
       
       
        onValue(demandesRef, (snapshot) => {
          const demandesData = snapshot.val();
          
          if (demandesData) {

            // Convertir les données de la base de données en tableau
            const demandesArray = Object.entries(demandesData).map(([key, value]) => ({
              id: key,
              ...value,
            }));
            setDemandes(demandesArray.reverse());

                  setMyVariable(prevState => ({
              ...prevState,
              demandNbr: demandesArray.length

      }))

      set(ref(db , 'users/'+user.userKey+'/demandsNbr') , demandesArray.length)
          }
        });
    
        // Désabonnez-vous de la base de données Firebase Realtime lorsque le composant est démonté
        return () => {
          onValue(demandesRef, null);
        };
      }, []);
  


      if (demandes.length!=0) {
        return (
        <Page>
          <br /><br /><br /><br /><b></b>
            <List mediaList style={{marginTop:'-30px'}}>
          <div style={{padding: '10px', fontWeight: 'bold'}}
          
          >Historique de vos demandes {allDemandesSise}</div>
    
           {
              demandes.map((demande)=>{
  
  
  
                const messageTime = new Date(demande.date);
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
                let state 
                let color 
                if (demande.statut) {
                  state = demande.statut
                  if (state=='favorable') {
                    color = '#28ba62'
                  }else{
                    color = 'red'
                  }
               }else{
                 state = 'en attente'
                 color= 'black'
               }
              if (demande.sender.email===user.email) {
                
                         return(
                  <ListItem 
                  
                  onClick={
                       ()=>{
                          setOpen(true)
                           f7.popup.open('.popup-login')
                          setDemand(demande)
              
                      }
                  }
                       badge={
                       (
                        <Badge color="white">
                          <span style={{color: color,
                           fontWeight: 'bold',
                           fontSize: '16px'
                           }}>
                            {state}
                           </span>
                        </Badge>
                      )
                    }
                    badgeColor = 'white'
                    title= {displayTime} 
                    text= {'Vous avez demandé un service de '+ demande.service+ 
                    'Cliquer pour voir plus de détails'}
                  >
                   
                    <img
                      src={logo}
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      slot="media"
                    />
                  </ListItem>
              )
              }
              })
           }
            
            </List>
           <Popup className='popup-login demande-details' >
            <Page>
                <Navbar>
              <NavLeft >
                 <Link popupClose>
                 <Icon material="arrow_back" slot="media"/>

                 </Link>
              </NavLeft>
              <NavTitle>Les détails de ma demandes </NavTitle>
            </Navbar>
            {
              open ?
                  <div className="contenu" >
       
        <Block>
          <div class="container">
           
           <Details demand={demand} />

    
          <Buttons demand={demand} />
       </div>
      <div style={{textAlign: 'center'}}>
       <h3>Evaluer les prestataire</h3>

      <Evaluation demand={demand}/>

    </div>
    
    

   </Block>





           </div>               

              :null
            }

               <Messagebar placeholder="Laisser un commentaire ici.." 
      value={comment}
      onChange={
        (e)=>{
            setComment(e.target.value)
        }
      }
      >
         
        <Link
         slot="inner-start"
        >
        <div className="profile-image-container" style={{width:'35px',height:'35px'}}>
           <div class="profile-image" style={{backgroundImage: 'url('+user.profile+')'}} data-alt="Photo de profil"></div>
          </div>
        </Link>
        <Link
          iconIos="f7:arrow_up_circle_fill"
          iconAurora="f7:arrow_up_circle_fill"
          iconMd="material:send"
          slot="inner-end"
          onClick={
            ()=>{
           if (comment!=='') {
                   const newComment = {
                    date: (new Date()).toDateString(),
                    body: comment,
                    author: JSON.parse(localStorage.getItem('user')),
                    service: demand.service
                   }
                 set(ref(db,'AllDemandes/'+demand.id+'/views'+'/comments'), newComment)
                  // Envoyer vers une collection particulière
                  set(ref(db,'demandes/'+userId+'/'+demand.id+'/views'+'/comments'),{
                    date: (new Date()).toDateString(),
                    body: comment,
                    author: JSON.parse(localStorage.getItem('user')),
                     service: demand.service

                  }).then(
              ()=>{
                setComment('')
                f7.dialog.alert('', 'Nous vous remercions pour votre commentaire. Cela nous permettra d\'améliorer la qualité de nos services.')
              }
            )
              }else{
                console.log(demand.id)
                f7.dialog.alert('', 'Vous devrez écrire saisir un texte avant de soumettre ce formulaire ')
              }
              
            }
          }
        />
      </Messagebar>
            </Page>


           </Popup>

        </Page>

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





export default Historique;