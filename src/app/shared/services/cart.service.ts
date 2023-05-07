import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Cart } from '../models/Cart';
import { Drink } from '../models/Drink';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  collectionName = 'Carts';

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {}

  getDrinkFromCart(id: string) {
    return this.afs.collection<Drink>('Drinks').doc(id).valueChanges();
  }

  create(cart: Cart) {
    return this.afs.collection<Cart>(this.collectionName).doc(cart.id).set(cart);
  }

  update (id: string, value: string, ar: number) {
    //this.afs.collection<Cart>(this.collectionName).doc(id).valueChanges();
    return this.afs.collection<Cart>(this.collectionName).doc(id).update({ drinks : value, carted_count : ar});
  }

  delete(id: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).delete();
  }

  getCartById(id: string) {
    return this.afs.collection<Cart>(this.collectionName).doc(id).valueChanges();
  }
}
