import React, { useState } from 'react';
import { Page, Navbar, List, ListItem,Button,Block, ListInput } from 'framework7-react';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA9A7smM7BULTiQyMZ7Y1UxqM3S-ZhYgZ4",
  authDomain: "oxygene-6e5c5.firebaseapp.com",
  databaseURL: "https://oxygene-6e5c5-default-rtdb.firebaseio.com",
  projectId: "oxygene-6e5c5",
  storageBucket: "oxygene-6e5c5.appspot.com",
  messagingSenderId: "25944032722",
  appId: "1:25944032722:web:c1339242d92b5c16cb740b",
  measurementId: "G-QD2T1Y04BN"
};
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

import { get, getDatabase, ref, set } from "firebase/database";

// Constante pour realtime Database 
export const db = getDatabase(app);
//Constante pour authentification
export  const auth = getAuth(app);










