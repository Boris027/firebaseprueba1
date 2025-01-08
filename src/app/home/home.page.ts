import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { initializeApp } from "firebase/app";
import { addDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc,getDoc,collection,query,where,getDocs,deleteDoc,updateDoc  } from "firebase/firestore"; 

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

export interface textdata{
  text:string,
  id:string
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})


export class HomePage {
  
  array:textdata[]=[]
  namecollection="text"
  constructor(private alertcontroller:AlertController) {
    //this.meterdatos()
    //this.getone()
    this.getall()
  }

  
  async add(textcontent:string){
    let response:any=await addDoc(collection(db, this.namecollection), {
      text:textcontent
    });
    console.log("Response")
    if(response._key.path.segments){
      this.array.push({text:textcontent,id:response._key.path.segments[1]})
    }
  }

  /*async getone(){
    const docRef = doc(db, "text");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }*/


  async getall(){
    const querySnapshot = await getDocs(collection(db, this.namecollection));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      let texto=(doc.data() as textdata).text
      this.array.push({text:texto,id:doc.id})
    });
  }

  async deleteone(id:string,event:any){
    event.stopPropagation();

    let response=await deleteDoc(doc(db, this.namecollection, id));

    let index:number=this.array.findIndex(c=>c.id==id)
    this.array.splice(index,1)
  }
  

  async modify(id:string,finaltext:string){
    console.log(id)
    console.log(finaltext)
    const textref = doc(db, this.namecollection, id);
    let response=await updateDoc(textref, {
      text: finaltext
    })

    let index:number=this.array.findIndex(c=>c.id==id)
    this.array[index].text=finaltext

  }

  async createalert(element:textdata){
    const alert = await this.alertcontroller.create({
      header: "Modify", 
      inputs: [
        {
          name: 'text',
          type: 'text',
          //label: this.translate.instant('COMMON.ENGLISH'),
          value: element.text, 
           
        }
      ],
      buttons: [
        {
          text: "Cancel", 
          role: 'cancel',
        },
        {
          text: "Save",
          handler: (data) => {
            if (data) {
              this.modify(element.id,data.text)
            }
          },
        },
      ],
    })
    await alert.present()
  }
  
}

