import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductPopupComponent } from './product-popup.component';

@NgModule({
  declarations: [ProductPopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule],
  exports: [ProductPopupComponent]
})
export class ProductPopupModule { }
