import React ,{useContext} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Card, CardHeader, CardContent, CardFooter, Button, Icon , Sheet, PageContent, Link, f7} from 'framework7-react';
import DemandeForm from './demandForm';
import MyContext from '../../contextes/appContext';


const tachesDomestiques = [
  {
    name: "Nettoyage des maisons",
    icon: 'delete'
  },
  {
    name:  "Courses domestiques",
    icon: "shopping_basket"
  },
 {
  name:  "Entretien des jardins",
  icon: "grass"
 },
 {
  name: "Aide à la cuisine",
  icon: 'soup_kitchen'
},
{
  name:  "Lavage et repassage des vêtements",
  icon: "iron"
},
{
name:  "Travaux de decoration",
icon: "chair"
},
 

  // ... Ajoutez le reste des tâches ici
];

const TacheDomestiqueCard = ({ tache, nbPersonnes }) =>{
  const { myVariable, setMyVariable } = useContext(MyContext);

  return  (
    <Card className="horizontal-card task" style={{ backgroundColor: 'white' }}>
      <div className="card-header">
        <Icon material={tache.icon} slot='media' style={{fontSize: '80px'}}/>
      </div>
      <CardContent style={{ width: '250px' }}>
        <div className="card-content-inner">
          <h4>{tache.name}</h4>
          <p>{nbPersonnes} personnes demandent cette tâche</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button href="#" className="button button-round btn" fill
onClick={
  ()=>{
    if(localStorage.getItem('user')!=null){
      setMyVariable(prevState => ({
        ...prevState,
        demandForm: true
    }))
    }else{
      setMyVariable(prevState => ({
        ...prevState,
        demandForm: false
    }))
    f7.dialog.alert(`
    Vous  n'avez pas encore de compte sur cet appareil.
     Veillez-en créer. Si vous avez déjà un compte Oxygene sur un autre 
     appareil , veillez-vous connecter
    `)

    }
  }
 
   
  
}      
        >demander le service</Button>
        <Button href="#" className="button button-round btn detail-btn" fill
         color='white'>
          <Link 
          onClick={
            ()=>{
              f7.popup.open('.popup-confirmation')
            }
          }
           style={{color:'black'}}>voir plus</Link>
         </Button>
      </CardFooter>
      
      <Sheet
          className="demo-sheet-swipe-to-close"
          style={{ height: 'auto', '--f7-sheet-bg-color': '#fff' }}
          swipeToClose
          backdrop
        >
          <PageContent>
            
          </PageContent>
        </Sheet>
    </Card>
  );
}

const ListeTachesDomestiques = () => (
  <Swiper
    spaceBetween={20}
    slidesPerView={1}
    autoplay={{ delay: 2000 }}
    loop={true}
    speed={500}
    centeredSlides={true}
    grabCursor={true}
    breakpoints={{
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    }}
  >
    {tachesDomestiques.map((tache, index) => (
      <SwiperSlide key={index}>
        <TacheDomestiqueCard tache={tache} nbPersonnes={Math.floor(Math.random() * 10)} />
      </SwiperSlide>
    ))}
  </Swiper>
);




export default ListeTachesDomestiques;
