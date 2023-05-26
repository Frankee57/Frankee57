import { push, ref, set } from 'firebase/database';
import { Block, Button, List, ListItem, Page , Icon, f7} from 'framework7-react';
import React, { useState, useContext } from 'react';
import '../css/demande.scss'
import { db } from './backend';
import { residences } from './services/dataCenter';
import MyContext from '../../contextes/appContext';
import { reload } from 'firebase/auth';
import { homeTasks } from './services/taches';



const ModifForm = ({demand}) =>{
 if (demand!==undefined) {
   const { myVariable, setMyVariable } = useContext(MyContext);


   const [dep,setDep] = useState(demand.dep)
  const [com,setCom]= useState(demand.com)
  const [arr, setArr]= useState(demand.arr)
  const [communes ,setCommunes] = useState()
  const [arrondissements, setArrondissements]= useState()
  const [service, setService] = useState(demand.service)
  const [details,setDetails] = useState(demand.detail)

 
function upDateDemand() {
  const sender = localStorage.getItem('user')
  const userId = JSON.parse(sender).email.replace(/[^\w\s]/gi, "");
    const demandData= {
      dep: dep,
      com: com,
      arr: arr,
      sender: JSON.parse(sender),
      service: service,
      date:demand.date,
      detail: details

    }
    set(ref(db,'demandes/'+userId+'/'+demand.id), demandData).then(
      ()=>{
        window.location.reload()
        setMyVariable(prevState => ({
          ...prevState,
          demandForm: false
      }))

      f7.dialog.alert('','Votre demande a été modifiée')
      }
    ).catch(
      ()=>{
              f7.dialog.alert('','Votre demande n\'a pas été modifiée')

      }
    )

     set(ref(db,'demandes/'+demand.id), demandData).then(
      ()=>{
        window.location.reload()
        setMyVariable(prevState => ({
          ...prevState,
          demandForm: false
      }))
      }
    )
}
    const [depSelected,setDepSelected]=useState(false)
    const [comSelected,setComSelected]=useState(false)
    return (
   <Page className='demande-form'>
  
     <List>
     <h4 style={{padding:'10px'}}>
      <Icon material='work' slot='media' />
      <span
      style={{
        marginLeft:'10px'
       }}
      >Quel service voulez-vous demander ?</span>
     </h4>
     <ListItem
        title="Quel service chechez-vous ?"
      openIn=''

        smartSelect
        smartSelectParams={{closeOnSelect: true, searchbar: true, 
        openIn: 'popup',

        searchbarPlaceholder: 'Chercher un service' }}
        target='ok'
      >
        <select name="car" multiple defaultValue={['honda', 'audi', 'ford']}
        
       onChange={
        ()=>{
              const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
              setService(selectedOptions)
        }
       }
        >
         {
          homeTasks.map((elment)=>{
            return(
               <optgroup label={elment.categoryName} >
                 {
                  elment.tasks.map((task)=>{
                    return(
                      <option value={task} onClick={
                        
                          (e)=>{
                            console.log(e.target.value)
                          }
                        
                      }>
                          {task}
                      </option>
                    )
                  })
                 }
              </optgroup>
            )
          })
         }
     
        </select>
      </ListItem>
     </List>
     <List>

     <h4 style={{padding:'10px'}}>
      <Icon material='room' slot='media' />
      <span
      style={{
        marginLeft:'10px'
       }}
      >Quelle est votre résidence actuelle ?</span>
     </h4>
     <ListItem title="Votre Département" smartSelect
              smartSelectParams={{
                openIn: 'popup',
                 closeOnSelect: true,

                searchbar: true,
                searchbarPlaceholder: 'Rechercher votre département',
              }}
                
            >
               <select onChange={e => {
             setDep(e.target.value)
               for (let index = 0; index < residences.length; index++) {
               if (e.target.value===residences[index].depar) {
               setCommunes(residences[index].communes)
               setDepSelected(true)
          }    
      } 
         }}  >

        {
          residences.map((elemnt)=>{
            return (
              <option value={elemnt.dep}>
                {elemnt.depar}
              </option>
             
            )
          })
        }

            
    
              </select>
    
            </ListItem>
{
  // Si le departement est choisi , les communes de ce derniers s'affiches



depSelected ?
            <ListItem title="Votre Communes" smartSelect
              smartSelectParams={{
                openIn: 'popup',
                                closeOnSelect: true,
                searchbar: true,
                searchbarPlaceholder: 'Rechercher votre commune',
              }}
                
            >
           <select onChange={e => {
         for (let index = 0; index < communes.length; index++) {
          if (e.target.value===communes[index].comm) {
              setCom(e.target.value)
              setArrondissements(communes[index].arr)
               setComSelected(true)
          
            }    
      } 
         }} 
          >

        {
          communes.map((elemnt)=>{
            return (
              <option value={elemnt.comm}>
                {elemnt.comm}
              </option>
             
            )
          })
        }

            
    
              </select>
    
            </ListItem>
:null
}


{
 // Si une commune  est choisi , les arrondissment  de cette  dernierre s'affiches

comSelected ?
            <ListItem title="Votre Arrondissement" smartSelect
              smartSelectParams={{
                openIn: 'popup',
                 closeOnSelect: true,

                searchbar: true,
                searchbarPlaceholder: 'Rechercher votre arondissement',
              }}
                
            >
           <select onChange={e => {
             setArr(e.target.value) 
         }}  

         >

        {
          arrondissements.map((elemnt)=>{
            return (
              <option value={elemnt}>
                {elemnt}
              </option>
             
            )
          })
        }

            
    
              </select>
    
            </ListItem>
:null
}
  
    </List>   
      <List>
      <h4 style={{padding:'10px', display:'flex'}}>
        <Icon material='chat' slot='media' />
         <span style={{
          marginLeft:'10px'
         }}> Modifier descripion</span>
      </h4>

      <center>
      <textarea name="" id="" cols="20" rows="3" placeholder='Ecrivez-vous quelque chose'
      style={{border: '0.6px solid black', width:'80%',borderRadius:'30px',padding:'10px'}}

      onChange={(e)=>{
        setDetails(e.target.value)
      }}
      ></textarea>

      </center>
      </List>
     
    <Block>
        <Button fill
        onClick={upDateDemand}
        >Modifier</Button>
    </Block>
  </Page>


    );
 }
}

export default ModifForm;