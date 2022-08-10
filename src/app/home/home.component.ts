import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
declare const $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carouselData = [
    {imgSrc: '../../assets/gallery/gallery1.png'},
    {imgSrc: '../../assets/gallery/gallery2.png'},
    {imgSrc: '../../assets/gallery/gallery3.png'},
    {imgSrc: '../../assets/gallery/gallery4.png'},
    {imgSrc: '../../assets/gallery/gallery5.png'},
    {imgSrc: '../../assets/gallery/gallery6.png'},
    {imgSrc: '../../assets/gallery/gallery9.png'},
    {imgSrc: '../../assets/gallery/gallery10.png'}
  ];

  constructor(private service: ListingsService) { }

  ngOnInit(): void {
    this.setCarousel();
  }

  setCarousel(): any {
    this.carouselData.forEach((img) => {
      document.getElementById('home-carousel').innerHTML = document.getElementById('home-carousel').innerHTML + `<div class='item'><img src=${img.imgSrc}>
                         <div style="padding: 0 15px 15px 15px; z-index: 999"><div class="address-svg">
                            <!-- <?xml version="1.0" encoding="UTF-8"?> -->
                            <svg width="14px" height="20px" viewBox="0 0 14 20" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <title> ↳Color</title>
                                <defs>
                                    <path
                                        d="M7,0 C3.13,0 0,3.13 0,7 C0,12.25 7,20 7,20 C7,20 14,12.25 14,7 C14,3.13 10.87,0 7,0 Z M7,9.5 C5.62,9.5 4.5,8.38 4.5,7 C4.5,5.62 5.62,4.5 7,4.5 C8.38,4.5 9.5,5.62 9.5,7 C9.5,8.38 8.38,9.5 7,9.5 Z"
                                        id="path-1"></path>
                                </defs>
                                <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="location">
                                        <mask id="mask-2" fill="white">
                                            <use xlink:href="#path-1"></use>
                                        </mask>
                                        <use id="-↳Color" fill="#505050" xlink:href="#path-1"></use>
                                    </g>
                                </g>
                            </svg>
                            <div id="address">
                                <p class="address">
                                  <a target="_blank" href="https://www.google.com/maps/place/32983+Cedar+Ridge+Ct,+Warren,+MI+48093/@42.5544618,-83.0746261,12.25z/data=!4m5!3m4!1s0x8824dbcdab3fee0b:0x2795c237312a54c2!8m2!3d42.5362139!4d-83.0067746?hl=en&authuser=0">32983 Cedar Ridge Ct #10 Warren, MI 48093</a>
                                </p>
                            </div>
                        </div>
                        <h6>APARTMENT FOR LEASE $1200</h6>
                        <div class="bed-bath">
                          <p>3 BEDS | 1.5 BATHS | 800 SQFT</p>
                        </div>
                        </div>
                      </div>`;
    });
    const sync1 = $('#home-carousel');

    $(document.documentElement).on('keyup', (event) => {
      if (event.keyCode === 37) {
        sync1.trigger('prev.owl.carousel');
      }
      else if (event.keyCode === 39) {
        sync1.trigger('next.owl.carousel');
      }
    });

    const $carousel = sync1.owlCarousel({
      items: 2,
      slideSpeed: 2000,
      nav: true,
      autoplay: false,
      dots: false,
      autoWidth: true,
      margin: 20,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<img src="../../assets/icons/carousel_left.png">', '<img src="../../assets/icons/carousel_right.png">']
    });
    $carousel.data('owl.carousel')._invalidated.width = true;
  }



}
