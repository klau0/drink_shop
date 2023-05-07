import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';
import { Drink } from 'src/app/shared/models/Drink';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{

  cartedDrinks: any[][] = [];
  uId: string = "";
  kosar: any = "";

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    this.start().then(_ =>{
      //console.log(this.cartedDrinks);
    });
  }

  async start(){
    try {
      const _ = await firstValueFrom(this.authService.isUserLoggedIn()).then(user => {
        this.uId = user!.uid;
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }

    try {
      const _ = await firstValueFrom(this.cartService.getCartById(this.uId)).then(cart => {
        this.kosar = cart!
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }

    let italok = this.kosar.drinks.toString().split(";");
    //debugger;

    this.cartedDrinks = [];

    for (let i = 0; i < italok.length-1; i++){
      this.cartedDrinks[i] = [];

      let t = italok[i].split(',');

      try {
        let d = await firstValueFrom(this.cartService.getDrinkFromCart(t[0]));
        this.cartedDrinks[i][0] = d;
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }

      this.cartedDrinks[i][1] = +t[1];
    }
  }

  async valtozik(d: Drink, n: number){
    console.log(this.cartedDrinks);
    let ossz = this.kosar.carted_count;
    let italok = this.kosar.drinks.toString();
    italok = italok.split(";");
    let del = -1;

    for (let i = 0; i < italok.length-1; i++){
      let t = italok[i].split(',');
      if (t[0] === d.id){

        ossz += ( n * (+d.price) );
        // debugger;

        if (n === 0 ){
          ossz -= ( (+t[1]) * (+d.price) );
          del = i;
        } else if (( n === -1 && (+t[1]-1) === 0)){
          del = i;
        } else {
          console.log(t[1] + " : t[1]");
          t[1] = +t[1] + n;
          t = t.join(',');
          italok[i] = t;
          console.log(italok[i] + " : italok[i]");
        }
      }
    }

    if (del > -1) {italok.splice(del, 1);}
    italok = [...italok];
    italok = italok.join(';');

    //console.log(italok + "ITALOK");

    if (this.kosar.carted_count < 0) {this.kosar.carted_count = 0;}
    console.log(ossz);

    try{
      const _ = await this.cartService.update(this.uId, italok, ossz);
      console.log('Sikeres update!!!');
      this.start();
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }
}
