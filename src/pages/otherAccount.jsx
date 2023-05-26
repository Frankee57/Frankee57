import { List, Page , ListItem , Icon,Toolbar,Link, Button , Sheet,PageContent, Block} from 'framework7-react';
import React, { useState } from 'react';

function OtherAccount(props) {
    // Initialiser un tableau pour stocker les valeurs
let userValues = [];
const countUserKeys = () => {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.includes("user")) {
        count++;
      }
    }
    return count;
  };
// Boucler sur les clés du localStorage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);

  // Vérifier si la clé contient le mot '@'
  if (key.includes('@')) {
    // Ajouter la valeur correspondante au tableau
    const value = localStorage.getItem(key);
    userValues.push({
        key: key,
        value: JSON.parse(value)
    });
  }
}

// Afficher les valeurs dans la console
console.log(userValues);

const [accountChoise , setAccountChoise] = useState(null)
    return (
        <Page>
  <br /><br /><br /><br />
            <List>
          
             {
                userValues.map((user)=>{
                    return(
                        <ListItem > 
                      <div className="profile-image-container" style={{width:'30px',height:'30px'}}>
                   <div class="profile-image" style={{backgroundImage:
                     'url('+user.value.pic+')'}} data-alt="Photo de profil"></div>
                </div>
                        <span style={{marginLeft:'-20px', width:'60%'}}>
                            {user.value.firstName}  {user.value.lastName}

                        </span>
                        <Button sheetOpen = '.demo-sheet-swipe-to-close'
                        onClick={
                            ()=>{
                                setAccountChoise(user)
                            }
                        }
                        >
                        <Icon material='more_vert' style={{opacity:'0.3'}} />

                        </Button>
                         </ListItem>
                    )
                })
             }
            </List>


            <Sheet
        className="demo-sheet-swipe-to-close"
        style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }}
        swipeToClose
        backdrop
      >
        <PageContent>
         <List>
         <ListItem  
          onClick={
            ()=>{
              

                      localStorage.setItem('connected', accountChoise.value.email)
                      const lastUser = JSON.parse(localStorage.getItem('user'))
                      localStorage.setItem(lastUser.email , JSON.stringify(lastUser))
                      localStorage.setItem('user',JSON.stringify(accountChoise.value))
                      window.location.reload()
            }
                 }
          >
            <Icon material='person' slot='media' />
            <Link sheetClose>Continuer avec ce compte</Link>
          </ListItem>
          <ListItem  
          onClick={
            ()=>{
              localStorage.removeItem(accountChoise.key)
               window.location.reload()              
            }
          }
          >
            <Icon material='delete' slot='media' />
            <Link sheetClose>Supprimer le compte</Link>
          </ListItem>
         </List>
        </PageContent>
            </Sheet>
        </Page>
    );
}

export default OtherAccount;