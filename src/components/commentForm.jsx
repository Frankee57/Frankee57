import { onValue, push, ref, remove, set } from 'firebase/database';
import { ListItem,List, Page, Toolbar, Link, Icon,Block,Badge,Popup, Preloader, PageContent ,NavRight  ,Messagebar,Popover, Button, Navbar, Sheet, f7 } from 'framework7-react';
import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../contextes/appContext';
import { db } from './backend';
import  Loader from './loader';
import '../css/loader.scss'
import '../css/details.scss'
import { allDemandesSise, logo } from './services/dataCenter';
function CommentForm(props) {
      const [demandes,setDemandes]= useState([])
    const [open, setOpen] = useState(false)
    const { myVariable, setMyVariable } = useContext(MyContext);
    const user = JSON.parse(localStorage.getItem('user'))
    const [loaded, setLoaded] = useState(false)
    const [demand,setDemand] = useState(null)
    const [comment , setComment] = useState('');
    return (
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
                    text: comment,
                    author: JSON.parse(localStorage.getItem('user')),
                    service: demand.service
                   }
                 push(ref(db,'views/'+userId), newComment)
                  // Envoyer vers une collection particulière
                  set(ref(db,'demandes/'+userId+'/'+demand.id+'/views'+'/comments'),{
                    date: (new Date()).toDateString(),
                    text: comment,
                    author: JSON.parse(localStorage.getItem('user')),
                  }).then(
              ()=>{
                setComment('')
                f7.dialog.alert('', 'Nous vous remercions pour votre commentaire. Cela nous permettra d\'améliorer la qualité de nos services.')
              }
            )
              }else{
                f7.dialog.alert('', 'Vous devrez écrire saisir un texte avant de soumettre ce formulaire ')
              }
              
            }
          }
        />
      </Messagebar>




    );
}

export default CommentForm;