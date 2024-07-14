import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from '../products/product.service';

@Component({
  selector: 'pm-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  pageTitle = 'Contact us';

  contactForm: FormGroup;
  validMessage: String = "";

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      companyName: new FormControl(),
      purpose: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    })
  }

  submitContactForm() {
    if (this.contactForm.valid) {
      this.validMessage = 'We have recieved your details.. We will get in touch soon. Thank you!';
      this.productService.submitContactForm(this.contactForm.value).subscribe(data => {
        this.contactForm.reset();
        return true;
      },
        error => {
          return Observable.throw(error);
        }
      )
    } else {
      this.validMessage = 'Please fill the form completely before submitting'
    }
  }

}
