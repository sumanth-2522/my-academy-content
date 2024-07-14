import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pm-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  pageTitle = 'About us';

  constructor() { }

  ngOnInit(): void {
  }

}
