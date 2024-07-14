import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {

  subject = new Subject();
  constructor() { }

  sendMessage(product) {
    this.subject.next(product);

  }

  getMessage(){
    return this.subject.asObservable();

  }
}
