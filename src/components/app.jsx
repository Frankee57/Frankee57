import React, { useState, useEffect } from 'react';
import { getDevice }  from 'framework7/lite-bundle';
import {
  f7,
  f7ready,
  App,

  Views,
  View,
 
} from 'framework7-react';
import cordovaApp from '../js/cordova-app';
import capacitorApp from '../js/capacitor-app';
import routes from '../js/routes';
import store from '../js/store';
import { MyProvider } from '../../contextes/appContext';

const MyApp = () => {
 
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'oxygene', // App name
      theme: 'auto', // Automatic theme detection


      id: 'io.framework7.myapp', // App bundle ID
      // App store
      store: store,
      // App routes
      routes: routes,
      // Register service worker (only on production build)
      serviceWorker: process.env.NODE_ENV ==='production' ? {
        path: '/service-worker.js',
      } : {},
      // Input settings
      input: {
        scrollIntoViewOnFocus: device.capacitor,
        scrollIntoViewCentered: device.capacitor,
      },
      // Capacitor Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
      // Input settings
      input: {
        scrollIntoViewOnFocus: device.cordova && !device.electron,
        scrollIntoViewCentered: device.cordova && !device.electron,
      },
      // Cordova Statusbar settings
      statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
      },
  };
  const alertLoginData = () => {
    f7.dialog.alert('Username: ' + username + '<br>Password: ' + password, () => {
      f7.loginScreen.close();
    });
  }
  f7ready(() => {
    // Init cordova APIs (see cordova-app.js)
    if (f7.device.cordova) {
      cordovaApp.init(f7);
    }
    // Init capacitor APIs (see capacitor-app.js)
    if (f7.device.capacitor) {
      capacitorApp.init(f7);
    }
    // Call F7 APIs here
  });

  return (
   <MyProvider>
     <App { ...f7params } >





<Views tabs className="safe-areas">

  

  <View id="view-home" main tab tabActive url="/" />



</Views>




</App>
   </MyProvider>
  )
}
export default MyApp;