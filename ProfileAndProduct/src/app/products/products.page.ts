import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { ProductService } from './product.service';

export interface Instrument {
  name: string;
  price: string;
  section: string;
  family: string;
  image: string;
  description: string;
}


@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  name: string = '';
  instruments: Instrument[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private modalController: ModalController, private productService: ProductService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['fullName'];
    });
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      console.log(data); 
      this.instruments = data.instruments;
    });
  }
  
  async openProductPopup(instrument: Instrument) {
    const modal = await this.modalController.create({
      component: ProductPopupComponent,
      componentProps: {
        instruments: this.instruments, 
        instrument: instrument
      },
    });
    return await modal.present();
  }
}
