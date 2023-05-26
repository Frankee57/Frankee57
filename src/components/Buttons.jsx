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
function Buttons({demand}) {
    return (
        <div>
            
           <div className="boutons" style={{display: 'flex',      justifyContent:'space-between'}}>


          <Link className='botn' popupOpen = '.popup-inbox'

          style={{textTransform: 'none',backgroundColor:'rgb(2, 2, 48)' }}>
           
            Modifier</Link>
          
          <Button className='botn' color='orangered'
        sheetOpen = '.demo-sheet-swipe-to-close'        
        raised  style={{textTransform: 'none',
       backgroundColor:'orangered' }}
 
          >
              Supprimer
            </Button>
       
      </div>

       <Popup className="popup-inbox" push>
        <Page>
          <Navbar title="Modifier ma demande">
            <NavRight>
              <Link popupClose>Annuler</Link>
            </NavRight>        
            
         </Navbar>
          <ModifForm demand={demand}/>
        </Page>
      </Popup>

        </div>
    );
}

export default Buttons;