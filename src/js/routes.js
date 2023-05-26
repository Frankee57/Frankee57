
import HomePage from '../pages/home.jsx';
import ServicePage from '../pages/services';
import DemandeFormPage from '../pages/demande-form';

import DynamicRoutePage from '../pages/dynamic-route.jsx';
import RequestAndLoad from '../pages/request-and-load.jsx';
import DevenirPresta from '../pages/devenirPresta.jsx';
import demandeurCompte from '../pages/demandeurCompte.jsx';
import Login from '../pages/loginSrenn.jsx';
import ConfigSettings from '../pages/ConfigSettings.jsx';
import OtherAccount from '../pages/otherAccount.jsx';
import Details from '../pages/Details.jsx';
import Confirm from '../pages/Confirm.jsx';
import PrestaPage from '../pages/PrestaPage.jsx';
import ConfirmPresta from '../pages/ConfirmPresta.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/services/',
    component: ServicePage,
  },

  {
    path: '/details/',
    component: Details,
  },
  
  {
    path: '/demande-form/',
    component: DemandeFormPage,
  },
  {
    path: '/login/',
    component: Login,
  },
  {
    path: '/devenirPresta/',
    component: DevenirPresta,
  },
  {
    path: '/demandeurCompte/',
    component: demandeurCompte,
  },

  {
    path: '/paramConfiden/',
    component: ConfigSettings,
  },
  {
    path: '/otherAccount/',
    component: OtherAccount,
  },
  
  {
    path: '/confirm/',
    component: Confirm,
  },
  {
    path : '/prestaPage/',
    component: PrestaPage
  },
   {
    path : '/confirmPresta/',
    component: ConfirmPresta
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },

];

export default routes;
