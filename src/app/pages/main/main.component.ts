import { Component, Input, OnInit } from '@angular/core';
import { Drink } from '../../shared/models/Drink';
import { FormControl } from '@angular/forms';
import { DrinkService } from '../../shared/services/drink.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  drinks: Array<Drink> = [];
  qty = new FormControl('');
  urls: any = {};

  constructor(private drinkService: DrinkService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    firstValueFrom(this.drinkService.loadDrinks()).then((data: Array<Drink>) => {
      console.log(data);
      if (data) this.drinks = data;
      for (let d of this.drinks){
        this.loadImg(d.img_url, d.id);
      }
    });
  }

  loadImg(n: string, id: string){
    firstValueFrom(this.drinkService.loadImage(n)).then(data => {
      this.urls[id] = data;
    });
  }

  to_cart(d: Drink){
    // this.qty.value
  }
}
