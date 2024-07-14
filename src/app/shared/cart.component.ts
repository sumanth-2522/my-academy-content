import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessangerService } from '../products/messanger.service';
import { IProduct } from '../products/product';
import { ICart } from '../products/cart';
import { ProductService } from '../products/product.service';
import { CartService } from '../products/cart.service';
import { isNgTemplate } from '@angular/compiler';
import { Order } from './order';

@Component({
    selector: 'ma-cart',
    templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

    pageTitle: String = "Shopping cart";

    constructor(private messanger: MessangerService,
        private productService: ProductService,
        private cartService: CartService) { }


    product: IProduct;
    errorMessage: string;

    cart: ICart[];


    // // product : IProduct;
    cartItems: IProduct[] = [];
    total: number = 0;
    returnedCartItems: IProduct[] = [];
    // pageTitle = 'Cart';
    // errorMessage: string;


    ngOnInit(): void {
        this.handleSubcription();
        this.getCartItems();

    }

    handleSubcription() {
        this.messanger.getMessage().subscribe((product: IProduct) => {
            this.getCartItems()

        });


    }

    getCartItems() {
        this.cartService.getCartItems(1).subscribe((items: ICart[]) => {
            this.cart = items;
            this.calculateCartTotal();
        })
    }

    calculateCartTotal() {
        this.total = 0;
        this.cart.forEach(item => {
            this.total += (item.prodQuantity * item.product.price)
        })

    }

    deleteItem(productId: number) {
        this.cartService.deleteCartItem(productId)
            .subscribe((data) => console.log(data));
        window.location.reload();

    }

    placeOrder() {
        this.cartService.placeOrder(new Order(true)).subscribe((data) => console.log(data));
        alert('Order sucessfully placed');
        window.location.reload();

    }


    //     addToCart(product: IProduct) : void {

    //         let isShoppingcart = false;


    //         for(let i in this.cartItems){
    //             if(this.cartItems[i].productId === product.productId){
    //                 this.cartItems[i].quantity++;
    //                 isShoppingcart = true;
    //                 break;
    //             }
    //         }

    //         if(!isShoppingcart){
    //             console.log(product);
    //             this.cartItems.push(product)
    //         }



    // }
}
