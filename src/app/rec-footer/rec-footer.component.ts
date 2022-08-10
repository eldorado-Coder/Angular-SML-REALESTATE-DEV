import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import set = Reflect.set;
declare const $;

@Component({
  selector: 'app-rec-footer',
  templateUrl: './rec-footer.component.html',
  styleUrls: ['./rec-footer.component.css']
})
export class RecFooterComponent implements OnInit, OnDestroy {
  constructor(public element: ElementRef) {}

  ngOnInit(): void {
    this.setCarousel();
  }
  ngOnDestroy(): void {
    this.element.nativeElement.remove();
    $('#recommendation-carousel').owlCarousel('destroy');
  }

  setCarousel(): any {
    const sync1 = $('#recommendation-carousel');

    $(document.documentElement).on('keyup', (event) => {
      if (event.keyCode === 37) {
        sync1.trigger('prev.owl.carousel');
      }
      else if (event.keyCode === 39) {
        sync1.trigger('next.owl.carousel');
      }
    });

    const $carousel = sync1.owlCarousel({
      items: 3,
      slideSpeed: 2000,
      nav: true,
      autoplay: false,
      dots: true,
      loop: true,
      margin: 10,
      autoWidth: true,
      responsiveRefreshRate: 200,
      navText: ['<img src="../../assets/icons/carousel_left.png">', '<img src="../../assets/icons/carousel_right.png">']
    });
    $carousel.data('owl.carousel')._invalidated.width = true;
  }
}
