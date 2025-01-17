import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { DetailsPage } from '../details/details';
import { AjoutPage} from '../ajout/ajout';
import { PhotoPage} from '../photo/photo';
import { MapPage} from '../map/map';

interface Items {

   }
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

	itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
 items: Observable<Items[]>; // read collection

 constructor(public navCtrl: NavController, db: AngularFirestore) {
 this.itemsCollection = db.collection<Items>('advertisements'); //ref()

 this.items=this.itemsCollection.snapshotChanges().map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as Items;
      const id = a.payload.doc.id;
      /*affichage de l'id du document*/
      console.log(a.payload.doc.id)
	   console.log("test"+a.payload.doc.data())
      return { id, ...data };
  })

})
 }

  itemSelected(item){
    console.log("click"+item.get)
    this.navCtrl.push(DetailsPage,{item:item});
  }

  ajouter(num){
    console.log("ajout"+num)
    this.navCtrl.push(AjoutPage,{num:num});
  }

  photo(num){
    console.log("photo"+num)
    this.navCtrl.push(PhotoPage,{num:num});
  }

  map(num){
    console.log("map"+num)
    this.navCtrl.push(MapPage,{num:num});
  }
}
