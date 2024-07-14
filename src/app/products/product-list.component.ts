import { error, stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { MessangerService } from './messanger.service';
import { IProduct } from './product'
import { ProductService } from './product.service';
import { CartService } from './cart.service';
import { ICart } from './cart';

@Component({
    // selector: 'ma-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']

})
export class ProductListComponent implements OnInit {
    pageTitle = "Product List";
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage: string;

    cart: ICart;

    constructor(private productService : ProductService,
      private messangerService: MessangerService,
      private cartService: CartService){
    }
    
    _listFilter: string;
    get listFilter() : string {
      return this._listFilter;
    }
    set listFilter(value: string){
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }



    filteredProducts : IProduct[];

    products: IProduct [];


      toggleImage() : void {
          this.showImage = !this.showImage;
      }

      openImage() : void {
        if(this.imageWidth === 50 && this.imageMargin === 2){
          this.imageWidth = 200;
          this.imageMargin = 20;
        }else if(this.imageWidth === 200 && this.imageMargin === 20){
          this.imageWidth = 50;
          this.imageMargin = 2;
        }
        
      }

      performFilter(filterBy: string) : IProduct [] {
        return this.products.filter((product: IProduct) => 
          product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
      }

      onRatingClicked(message: string): void {

        this.pageTitle += ": "+message;

      }

      ngOnInit() : void {
        this.productService.getProducts().subscribe({
          next: products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error: err => this.errorMessage = err
        });
      }

      addToCart(product: IProduct): void {

        // this.cart = new ICart(1, product);
        this.cartService.addProductToCart(product).subscribe(() => {
          this.messangerService.sendMessage(product);

        });
    
        // this.router.navigate(['/cart']);
    
        // console.log(this.product.productName);
      }
    
     }