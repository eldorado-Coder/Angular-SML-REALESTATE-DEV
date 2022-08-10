import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-d-view',
  templateUrl: './three-d-view.component.html',
  styleUrls: ['./three-d-view.component.css']
})
export class ThreeDViewComponent implements OnInit {

  hiddenAgent: boolean = true;
  hiddenTour: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  tourOverlay(): any {
    if (this.hiddenTour) {
      this.hiddenTour = false;
      console.log('click')
    }
  }

  agentOverlay(): any {
    if (this.hiddenAgent) {
      this.hiddenAgent = false;
    }
  }

  closeForm(): any {
    this.hiddenTour = true;
    this.hiddenAgent = true;
  }

  closeAgent(): any {
    this.hiddenAgent = true;
  }

}
