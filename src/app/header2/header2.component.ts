import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {

  noDisplay: boolean = true;
  disBtn: boolean;
  hiddenDrops: boolean = true;

  constructor() { }

  ngOnInit(): void {

  }

  moreFilters() {
    if (this.noDisplay) {
      this.noDisplay = false;
      this.disBtn = true;
      this.hiddenDrops = false;
      document.getElementsByClassName('home-lease-content')[0].classList.add('down');
    }
  }

  lessFilters() {
    this.noDisplay = true;
    this.disBtn = false;
    this.hiddenDrops = true;
    document.getElementsByClassName('home-lease-content')[0].classList.remove('down');
  }
}



