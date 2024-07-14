import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from "./shared/star.component";
import { CartComponent } from "./shared/cart.component";
import { ProductDetailGuard } from './products/product-detail.guard';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { AboutUsComponent } from './home/about-us.component';
import { ContactUsComponent } from './home/contact-us.component';
import { FAQComponent } from './home/faq/faq.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    CartComponent,
    ProductDetailComponent,
    WelcomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    FAQComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: 'products', component: ProductListComponent },
        {
          path: 'products/:id',
          canActivate: [ProductDetailGuard],
          component: ProductDetailComponent
        },
        { path: 'welcome', component: WelcomeComponent },
        { path: 'about', component: AboutUsComponent },
        { path: 'contact', component: ContactUsComponent },
        { path: 'cart', component: CartComponent },
        { path: 'faq', component: FAQComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', redirectTo: 'welcome', pathMatch: 'full' }

      ]
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
