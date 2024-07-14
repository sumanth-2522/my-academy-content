import { IProduct } from './product';

export class ICart {
    "cartId": number;
    "customerId": number;
    "prodQuantity": number;
    "product": IProduct;
    // "isOrdered": boolean;

    constructor(cartId: number, custId: number, qty: number, product: IProduct){
        this.cartId = cartId;
        this.customerId = custId;
        this.prodQuantity = qty;
        this.product = product;
        // this.isOrdered = isOrdered;
    }
}