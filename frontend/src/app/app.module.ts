import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankYouComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
