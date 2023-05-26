import { width } from 'dom7';
import { Page,Icon, Link, Toolbar , Navbar, NavLeft, NavTitle, Block } from 'framework7-react';
import React from 'react';

function Details(props) {
    return (
        <Page>
          
          <Block>
            <h2 style={{textAlign:'center'}}>BIENVENUE CHEZ OXYGENE,</h2>
            <p style={{padding: '10px',fontSize:'17px' }}>
             <span style={{width:'20px'}}></span> La plateforme de services d'ordre ménager en ligne qui 
           vous facilite la vie. Nous sommes une équipe de professionnels dévoués à vous fournir des solutions de nettoyage, de repassage, de jardinage et plus encore, 
          en vous mettant en relation avec les meilleurs prestataires de services locaux. 
          </p>
            <p style={{padding: '10px',fontSize:'17px' }}>
            Notre mission est de vous offrir un service fiable, sûr et facile à utiliser, pour vous aider à gagner du temps et à vous concentrer sur les choses importantes de la vie.
          </p>

            <p style={{padding: '10px',fontSize:'17px' }}>
            Chez Oxygène, nous nous efforçons de garantir la satisfaction de nos clients et de nos prestataires de services en leur offrant une expérience utilisateur de qualité. Nous sommes conscients que la confiance est la clé du succès, c'est pourquoi nous avons mis en place des mesures strictes pour assurer la sécurité de vos biens et de vos données personnelles. Nous sommes également soucieux de l'environnement et nous encourageons nos prestataires de services à utiliser des produits respectueux de l'environnement et à adopter des pratiques durables.

           </p>
             
            <p style={{padding: '10px',fontSize:'17px' }}>
            Nous sommes toujours à l'écoute de vos commentaires et suggestions pour améliorer nos services, alors n'hésitez pas à nous contacter si vous avez des questions ou des préoccupations. Merci d'utiliser Oxygène, nous sommes ravis de vous aider à rendre votre vie plus facile et plus agréable.
            </p>  
          </Block>
        </Page>
    );
}

export default Details;