import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDmEUJqaN-bIP1ZA5bw3MimeqZoyQDCEcA",
  authDomain: "prueba-93426.firebaseapp.com",
  projectId: "prueba-93426",
  storageBucket: "prueba-93426.firebasestorage.app",
  messagingSenderId: "356258959315",
  appId: "1:356258959315:web:fc6f1d40cae8a99aa26926"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class HomePage {
  

  constructor() {
    this.meterdatos()
  }

  
  async meterdatos(){
    await setDoc(doc(db, "cities", "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA"
    });
  }
  

}

