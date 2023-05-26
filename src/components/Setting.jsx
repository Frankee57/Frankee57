import React, { useState, useRef } from 'react';
import {
  Page,
  Navbar,
  Block,
  Button,
  Popup,
  NavRight,
  Link,
  BlockTitle,
  f7,
  Toolbar,
  Icon,
  ListItem,
  List,
} from 'framework7-react';
  const links = [
   {
    icon:'lock',
    component: '.demo-popup',
    text:  'Politique de confidentialité'
   },
     {
    icon:'group_work',
    component: '.demo-popup-push',
    text:  'Standard de la communauté'
   },
   {
    icon:'library_books',
    component: '.demo-popup-swipe',
    text:  'Conditions d\'utilisation'
   },
  
 

   {
    icon:'help',
    component: '',
    text:  'Trouver de l`\'aide'
   },

   
    
    
  ]
const ConfigSettings =  () => {
  const [popupOpened, setPopupOpened] = useState(false);
  const popup = useRef(null);

  return (
    
      
 <Page>
       <List>
       
       {
        links.map((link)=>{
          return(
             <ListItem>
             <Button  popupOpen={link.component} className='myBton'>
              {link.text}
             </Button>
            <Icon material={link.icon} slot='media' />

        </ListItem>
          )
        })
       }
       
      </List>
      <Popup
        className="demo-popup"
        opened={popupOpened}
        onPopupClosed={() => setPopupOpened(false)}
      >
        <Page>
          <Navbar title="POLITIQUE DE CONFIDENTIALITE">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>
          <Block>

<p>
Cette politique de confidentialité décrit comment
 nous collectons, utilisons et protégeons les informations
  que vous nous fournissez lorsque vous utilisez notre application 
  de services d'ordre ménager.
</p>

<h2>
COLLECTE D'INFORMATIONS

</h2>
<p>
Nous collectons des informations personnelles
 telles que votre nom, votre adresse e-mail et 
 votre numéro de téléphone lorsque vous vous inscrivez 
 pour utiliser notre application. Nous pouvons également
  collecter des informations sur votre emplacement et votre
   historique de navigation.

</p>
<h2>
UTILISATION DES INFORMATIONS

</h2>
<p>
Nous utilisons les informations collectées pour fournir 
des services de qualité, pour améliorer notre application, 
pour vous contacter à propos de nouveaux services ou promotions,
 pour répondre à vos demandes et pour respecter nos obligations légales.

</p>
<h2>
PROTECTION DES INFORMATIONS

</h2>
<p>
Nous prenons des mesures de sécurité appropriées pour protéger vos 
informations personnelles contre les accès non autorisés, la modification,
 la divulgation ou la destruction.

</p>
<h2>
PARTAGE D'INFORMATIONS

</h2>
Nous ne partageons pas vos informations personnelles avec des tiers, sauf si cela est nécessaire pour fournir les services que vous avez demandés ou si cela est exigé par la loi.

<h2>
MODIFICATIONS DE LA POLITIQUE DE CONFIDENTIALITÉ

</h2>
Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Nous vous informerons de tout changement important par e-mail ou en publiant une notification sur notre application.

<h2>
CONTACTEZ-NOUS

</h2>
Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité ou nos pratiques en matière de confidentialité, veuillez nous contacter à l'adresse e-mail suivante : [insérer votre adresse e-mail].

En utilisant notre application, vous acceptez les termes de cette politique de confidentialité.

Cordialement,

Oxygène
          </Block>
        </Page>
      </Popup>

      <Popup className="demo-popup-swipe" swipeToClose>
        <Page>
          <Navbar title="Conditions d'utilisation">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>

          <div
            style={{ height: '100%' }}
          >
            <p style={{padding:'10px',fontSize:'20px'}}>

Bienvenue dans les conditions d'utilisation d'Oxygène ! <br />

<b>Introduction</b><br />
Les présentes conditions d'utilisation régissent l'utilisation de l'application Oxygène (ci-après "l'Application") et énoncent les modalités et les conditions auxquelles les utilisateurs de l'Application (ci-après les "Utilisateurs") peuvent accéder et utiliser les services fournis par la plateforme.
<h2>
Utilisation de l'Application

</h2><br />
<b>
2.1 Accès à l'Application
</b> <br />

Pour accéder à l'Application, les Utilisateurs doivent créer un compte en fournissant des informations précises, complètes et à jour. Les Utilisateurs sont responsables de la sécurité de leur compte et de leurs identifiants de connexion. Les Utilisateurs acceptent de ne pas partager leur compte ni leurs identifiants de connexion avec des tiers et de nous informer immédiatement de toute utilisation non autorisée de leur compte.
<br />
<b>
2.2 Services
</b>
<br />
L'Application permet aux Utilisateurs de demander des services d'entretien ménager. Les prestataires de services enregistrés sur la plateforme Oxygène peuvent accepter ou refuser la demande de service. Si la demande est acceptée, un prestataire de service se rendra à l'adresse indiquée pour effectuer le service demandé.
<br />
<b>
2.3 Responsabilité
</b>
<br />
Oxygène est responsable des éventuels dommages ou problèmes qui pourraient survenir sur le lieu de travail pendant la prestation du service. Toutefois, la responsabilité d'Oxygène se limite à la valeur maximale de la prestation de service.
<br />
<b>
2.4 Rémunération
</b>

<br />
Les prestataires de services enregistrés sur la plateforme Oxygène sont tenus de céder une partie de leur rémunération pour l'utilisation de la plateforme. Les modalités de rémunération sont définies dans les accords séparés conclus entre Oxygène et les prestataires de services.
<br />
<h2>
Propriété intellectuelle

</h2><br />

Tous les droits de propriété intellectuelle relatifs à l'Application, y compris les droits d'auteur, les marques commerciales et les brevets, appartiennent à Oxygène. Les Utilisateurs acceptent de ne pas reproduire, distribuer, modifier ou utiliser de toute autre manière tout contenu ou élément de l'Application sans l'autorisation écrite préalable d'Oxygène.
<br />
<h2>
Confidentialité
</h2><br />
Oxygène collecte, utilise et protège les informations personnelles des Utilisateurs conformément à sa politique de confidentialité. Les Utilisateurs acceptent de se conformer à la politique de confidentialité d'Oxygène en utilisant l'Application.
            </p>
          </div>
        </Page>
      </Popup>

      <Popup className="demo-popup-push" push>
        <Page>
          <Navbar title="Standard de confidentialité">
            <NavRight>
              <Link popupClose>Fermer</Link>
            </NavRight>
          </Navbar>
          <Block strong>
            <h2>Introduction</h2>
            <p>
            Les standards de la communauté d'Oxygène sont un ensemble de 
            règles et de normes qui doivent être respectées par tous les Utilisateurs 
            de la plateforme. Ces standards ont pour but de garantir un environnement 
            sûr et respectueux pour les Utilisateurs, les prestataires de services et 
            la communauté dans son ensemble.


            </p>
            <h2>
            Respect
            </h2>
            <p>
            
             Les Utilisateurs d'Oxygène doivent respecter les autres Utilisateurs, 
             les prestataires de services et les membres de la communauté. Toute
              forme de harcèlement, de discrimination, de violence ou de comportement 
              inapproprié ne sera pas tolérée.

            </p>
            <h2>
            Intégrité
            </h2>
            <p>
            
         Les Utilisateurs d'Oxygène doivent agir avec intégrité et honnêteté.
          Ils ne doivent pas fournir de fausses informations ou induire en erreur 
          
          les autres Utilisateurs ou les prestataires de services.

            </p>
            <h2>Confidentialité</h2>
            <p>
            Les Utilisateurs d'Oxygène doivent respecter la confidentialité des
             informations personnelles des autres Utilisateurs et des prestataires
              de services. Ils ne doivent pas divulguer ces informations à des tiers
               sans le consentement préalable des personnes concernées.


            </p>

            <h2>Sécurité</h2>
            <p>
            Les Utilisateurs d'Oxygène doivent prendre les mesures nécessaires pour 
            assurer leur propre sécurité ainsi que celle des prestataires de services. 
            Ils ne doivent pas mettre en danger la sécurité des autres Utilisateurs ou
             des prestataires de services.



            </p>

            <h2>Uilisation de l'application</h2>
            <p>
            Les Utilisateurs d'Oxygène doivent utiliser l'application conformément 
            aux conditions d'utilisation. Ils ne doivent pas utiliser l'application à 
            des fins illégales ou pour nuire à d'autres Utilisateurs, prestataires de 
            services ou membres de la communauté.



            </p>

            <h2>
            Signalement des problèmes

            </h2>
            <p>
            Les Utilisateurs d'Oxygène doivent signaler tout problème ou toute
             comportement inapproprié à l'équipe de support d'Oxygène. Ils doivent 
             coopérer avec l'équipe pour résoudre les problèmes et maintenir un 
             environnement sûr et respectueux pour tous.

            </p>

            <h2>
                Conclusion
            </h2>
            <p>
            doivent être respectés par tous les Utilisateurs. Nous sommes déterminés 
            à maintenir un environnement sûr et respectueux pour tous les Utilisateurs, 
            prestataires de services et membres de la communauté.
            </p>
          </Block>
        </Page>
      </Popup>

      
    </Page>
      
    
  );
};

export default ConfigSettings 