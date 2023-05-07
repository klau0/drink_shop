import { Component, Input, OnInit } from '@angular/core';
import { Drink } from '../../shared/models/Drink';
import { FormControl } from '@angular/forms';
import { DrinkService } from '../../shared/services/drink.service';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  italLista: Array<Drink> = [];
  qty = new FormControl('');
  urls: any = {};
  uId: string = "";
  kosar: any;

  constructor(private drinkService: DrinkService, private cartService: CartService, private authService: AuthService) { }

  ngOnInit(): void {
    firstValueFrom(this.drinkService.loadDrinks()).then((data: Array<Drink>) => {
      if (data) this.italLista = data;
      for (let d of this.italLista){
        this.loadImg(d.img_url, d.id);
      }
    });

    this.start();
  }


  async start(){
    try {
      let user = await firstValueFrom(this.authService.isUserLoggedIn());
      this.uId = user!.uid;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }

    try {
      const cart = await firstValueFrom(this.cartService.getCartById(this.uId));
      this.kosar = cart;
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  }

  loadImg(n: string, id: string){
    firstValueFrom(this.drinkService.loadImage(n)).then(data => {
      this.urls[id] = data;
    });
  }

  to_cart(d: Drink){
    this.start();
    let ossz = +this.kosar.carted_count;
    let db = 0;
    if (this.qty.value != null){
      db = +this.qty.value;
    }

    if (db != 0){
      let uj_kell = true;
      let italok = this.kosar.drinks.toString();

      italok = italok.split(";");

      for (let i = 0; i < italok.length-1; i++){
        let t = italok[i].split(',');

        if (t[0] === d.id){
          t[1] = +t[1] + db;
          uj_kell = false;
        } else {
          uj_kell = true;
        }

        t = t.join(',');
        italok[i] = t;
      }

      italok = italok.join(';');
      if (uj_kell) { italok += (d.id + "," + db.toString() + ";"); }
      ossz += (db * (+d.price));
      console.log(ossz + " : összeg");

      this.cartService.update(this.uId, italok, ossz).then(_ => {
        console.log('Sikeres update!!!');
        firstValueFrom(this.drinkService.loadDrinks()).then((data: Array<Drink>) => {
          if (data) this.italLista = data;
        });
      });

      console.log(d);
    }
  } 
}
