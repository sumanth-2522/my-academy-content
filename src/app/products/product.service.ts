import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { ICart } from './cart';

import { IProduct } from './product';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productURL = '/server/api/v1/products/';

    private contactURL = '/server/api/v1/contact/';

    constructor(private http : HttpClient){}

    getProducts(): Observable<IProduct []> {
        return this.http.get<IProduct[]>(this.productURL).pipe(
            tap(data => console.log('All: '+ JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.http.get<IProduct[]>(this.productURL).pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id)));
    }

    submitContactForm(contact) {
        let body = JSON.stringify(contact);
        return this.http.post(this.contactURL, body, httpOptions);

    }

    private handleError(err : HttpErrorResponse){
        let errorMessage = '';
        if(err.error instanceof ErrorEvent){
            errorMessage = `An Error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
        
    }



}