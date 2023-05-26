import React from 'react';
import DemandeForm from '../components/demandForm';
import { Link, NavLeft, NavTitle, Navbar, Page } from 'framework7-react';

function newDemande(props) {
    return (
         
        <Page>
            <Navbar>
                <NavLeft>
                    <Link href='/'>
                    </Link>
                </NavLeft>
                <NavTitle>Nouvelle demande</NavTitle>
            </Navbar>
            <DemandeForm />

        </Page>
    );
}
 
export default newDemande;