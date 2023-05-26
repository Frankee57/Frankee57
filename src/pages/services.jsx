import React from 'react';
import {
  Page,
  Navbar,
  Subnavbar,
  Searchbar,
  List,
  ListItem,
  theme,
  Toolbar,
  Button,
  f7,
  Icon,
  ListGroup,
  AccordionContent,
} from 'framework7-react';
import { homeTasks } from '../components/services/taches';
let tachesMenageres = [
  "Balayer les sols",
  "Laver les vêtements à la main ou en machine",
  "Passer la serpillière sur les sols",
  "Nettoyer les surfaces de la cuisine et de la salle de bain",
  "Faire la vaisselle",
  "Ranger et nettoyer les placards et les tiroirs",
  "Épousseter les meubles et les objets de décoration",
  "Faire le lit et changer les draps",
  "Arroser les plantes",
  "Nettoyer les fenêtres et les miroirs"
];
const ServicePage  = () => (
  
    
  <Page>
    
     <Toolbar>
          <Button
          onClick={
            ()=>{
              f7.popup.close('.popup-confirmation')
            }
          }
          >
               <Icon material="arrow_back" slot="media"/>

          </Button>
          <Searchbar
          style={{width: '80%'}}
          searchContainer=".search-list"
          searchIn=".item-title"
          placeholder='rechercher un service'
          disableButton={false}
     ></Searchbar>
     </Toolbar>
   <br /><br /><br />
   
    <List className="searchbar-not-found">
      <ListItem title="Nothing found"></ListItem>
    </List>
    <List className="search-list searchbar-found"  style={{
                fontWeight: 'bold'
               }}>
        {
          homeTasks.map((task)=>{
           return(
               <ListItem accordionItem title={task.categoryName.toLocaleUpperCase()}
               
               >

          <AccordionContent style={{
                  marginLeft:'30px'
                }}>
           {
            task.tasks.map((element)=>{
              return(
                <ListItem >
                  {element}
                </ListItem>
              )
            })
           }
          </AccordionContent>
        </ListItem>
           )
          })
        }   
    </List>
  </Page>
    


  
);



export  default ServicePage;