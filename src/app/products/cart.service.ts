import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../shared/order';

import { ICart } from './cart';
import { IProduct } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
};


@Injectable({
  providedIn: 'root'
})


export class CartService {

  private cartURL = '/server/api/v1/cart/';

  private cartURL2 = '/server/api/v1/cart/delete';

  constructor(private http: HttpClient) { }

  getCartItems(customerId: number): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.cartURL+customerId).pipe(
      map((result: any[]) => {
        let cartItem : ICart [] = [];

        for(let item of result){
          let isShoppingcart = false;
          for(let i in cartItem){
            if(cartItem[i].product.productId === item.productId){
                cartItem[i].prodQuantity = item.prodQuantity;
                isShoppingcart = true;
                break;
            }
        }

        if(!isShoppingcart){
            cartItem.push(new ICart(item.cartId, item.customerId, item.prodQuantity, item.product));
        }

        }


        return cartItem;
      })

    );
  }

  addProductToCart(product: IProduct) :Observable<any>{

    let body = JSON.stringify(product);

    return this.http.post<any>(this.cartURL, body, httpOptions);

  }

  deleteCartItem(id: number) :any {
    return this.http.delete<any>(this.cartURL+id, httpOptions);
  }

  placeOrder(isOrdered: Order): Observable<any>{
    let body = JSON.stringify(isOrdered);
    return this.http.post<any>(this.cartURL2, body, httpOptions);
  }
}
