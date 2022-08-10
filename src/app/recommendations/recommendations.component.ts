import { Component, OnInit } from '@angular/core';
declare const $;

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setCarousel();
  }

  setCarousel(): any {
    const sync1 = $('#recom-carousel');

    $(document.documentElement).on('keyup', (event) => {
      if (event.keyCode === 37) {
        sync1.trigger('prev.owl.carousel');
      }
      else if (event.keyCode === 39) {
        sync1.trigger('next.owl.carousel');
      }
    });

    sync1.owlCarousel({
      items: 1,
      slideSpeed: 2000,
      nav: true,
      autoplay: false,
      dots: true,
      margin: 10,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<span>PREV</span>', '<span>NEXT</span>']
    });
  }

}
