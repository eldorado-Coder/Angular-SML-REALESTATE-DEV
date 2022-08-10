import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component implements OnInit {

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
    }

  }

  lessFilters() {
    console.log('click heard')
    this.noDisplay = true;
    this.disBtn = false;
    this.hiddenDrops = true;
  }

}
