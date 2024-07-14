import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FAQComponent implements OnInit {

  pageTitle: String = "FAQ";

  constructor() { }

  ngOnInit(): void {
  }

}
