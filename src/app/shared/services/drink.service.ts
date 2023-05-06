import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Drink } from '../models/Drink';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  collectionName = 'Drinks';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  loadDrinks(): Observable<Array<Drink>> {
    return this.afs.collection<Drink>(this.collectionName).valueChanges();
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
