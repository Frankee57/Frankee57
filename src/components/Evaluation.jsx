import React, { useState , useEffect} from 'react';
import { Button, Icon, Link, List, Sheet , PageContent } from 'framework7-react';
import '../css/details.scss'
import { push, ref, set } from 'firebase/database';
import { db } from './backend';

const Evaluation = ({demand}) => {
const sender = localStorage.getItem('user')
 const userId = JSON.parse(sender).email.replace(/[^\w\s]/gi, "");
 const user = JSON.parse(sender)
 const [star1,setStar1] = useState('');
 const [star2,setStar2] = useState('');
 const [star3,setStar3] = useState('');
 const [star4,setStar4] = useState('');
 const [star5,setStar5] = useState('');
 const [note , setNote]= useState(null)
    useEffect(() => {
              if (demand.views) {
                  setStar1(demand.views.stars.body.star1)
                 setStar2(demand.views.stars.body.star2)
                 setStar3(demand.views.stars.body.star3)
                 setStar4(demand.views.stars.body.star4)
                 setStar5(demand.views.stars.body.star5)
              }
  return () => {
    // code à exécuter lors du démontage du composant
  };
}, []);

 
const stars = [
    {
        id:1,
        className:''
    },
     {
        id:2,
        className:''
    },
     {
        id:3,
        className:''
    },
     {
        id:4,
        className:''
    },
     {
        id:5,
        className:''
    },
]

       return(
        <div >
           
             <Link
             sheetOpen = '.demo-sheet-top'        

              onClick={
                ()=>{
               
                 setNote(
                    {
                    star1: 'rated',
                    star2: '',
                    star3:'',
                    star4:'',
                    star5:''
                  }
                 )
                   setStar1('rated')
                   setStar2('')
                   setStar3('')
                   setStar4('')
                   setStar5('')
                }
               
            }
            className={star1}
            >
              <Icon material='star'  className={star1}/>
               
             
            </Link>
            <Link 
            sheetOpen = '.demo-sheet-top'        

            onClick={
                ()=>{
               setNote(
                  {
                    star1: 'rated',
                    star2: 'rated',
                    star3:'',
                    star4:'',
                    star5:''
                 }
               )
                  setStar1('rated')
                 setStar2('rated')
                setStar3('')
                setStar4('')
                 setStar5('')
                }
               
            }
            >
              <Icon material='star'  className={star2}/>

            </Link>
            <Link 
             sheetOpen = '.demo-sheet-top'        

            onClick={
                ()=>{
                 setNote(
                      {
                    star1: 'rated',
                    star2: 'rated',
                    star3:'rated',
                    star4:'',
                    star5:''
                   }
                 )
                 setStar1('rated')
                 setStar2('rated')
                 setStar3('rated')
                  setStar4('')
                 setStar5('')

                }
               
            }
            >
              <Icon material='star'  className={star3}/>

            </Link>

            <Link 
            sheetOpen = '.demo-sheet-top'        

            onClick={
                ()=>{
                 setNote(
                     {
                    star1: 'rated',
                    star2: 'rated',
                    star3:'rated',
                    star4:'rated',
                    star5:''
                 }
                 )
                 setStar1('rated')
                 setStar2('rated')
                 setStar3('rated')
                 setStar4('rated')
                 setStar5('')
                }
               
            }
            >
              <Icon material='star'  className={star4}/>

            </Link>
            <Link 
          sheetOpen = '.demo-sheet-top'        

            onClick={
                ()=>{
                 setNote(
                     {
                    star1:'rated',
                    star2: 'rated',
                    star3:'rated',
                    star4:'rated',
                    star5:'rated'
                 }
                 )
                 setStar1('rated')
                 setStar2('rated')
                 setStar3('rated')
                 setStar4('rated')
                 setStar5('rated')

                }
               
            }
            >
              <Icon material='star'  className={star5}/>

            </Link>

        <Sheet top
        className="demo-sheet-top"
        style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }}
        swipeToClose
        backdrop
      >
        <PageContent>
          <h3 style={{textAlign:'center'}}>Voulez-vous valider cette note ?</h3>
         <Button  
         
          >
            <Link
            onClick={
            ()=>{
                 set(ref(db,'demandes/'+userId+'/'+demand.id+'/views'+'/stars'),
                 {
                  date: (new Date()).toDateString(),
                  author: user,
                  body: note ,
                  service: demand.service

                 }
                 )
            set(ref(db,'AllDemandes/'+demand.id+'/views'+'/stars'),
                 {
                  date: (new Date()).toDateString(),
                  author: user,
                  body: note,
                  service: demand.service

                 }
                 )
              }
            }
            
             sheetClose
            
            
            >oui</Link>
          </Button>
            <Button  
            onClick={
                 ()=>{
                 set(ref(db,'demandes/'+userId+'/'+demand.id+'/views'+'/stars'),
                  {
                    star1: '',
                    star2: '',
                    star3:'',
                    star4:'',
                    star5:''
                 }
                 )

                  set(ref(db,'AllDemandes/'+demand.id+'/views'+'/stars'),
                  {
                    star1: '',
                    star2: '',
                    star3:'',
                    star4:'',
                    star5:''
                 }
                 )

                   setStar1('')
                   setStar2('')
                   setStar3('')
                   setStar4('')
                   setStar5('')

              }
            }
          >   
            <Link sheetClose>Non</Link>
          </Button>
        </PageContent>
            </Sheet>
        </div>
       )

};

export default Evaluation;