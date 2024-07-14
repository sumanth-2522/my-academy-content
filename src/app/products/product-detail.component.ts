import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { MessangerService } from './messanger.service';
import { CartComponent } from '../shared/cart.component';
import { CartService } from './cart.service';
import { ICart } from './cart';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  pageTitle = 'Product Details';
  product: IProduct;
  errorMessage: string;
  cart: ICart;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private messangerService: MessangerService,
    private cartService: CartService) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += ` :${id}`;
    this.productService.getProduct(id).subscribe({
      next: product => {
        this.product = product;
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }


  addToCart(): void {
    // this.cart = new ICart(1, this.product);

    this.cartService.addProductToCart(this.product).subscribe(() =>{
      this.messangerService.sendMessage(this.product);

    });

    alert("Item added to cart");

    

    // this.router.navigate(['/cart']);

    // console.log(this.product.productName);
  }

}
