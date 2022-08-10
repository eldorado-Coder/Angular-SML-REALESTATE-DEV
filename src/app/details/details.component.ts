import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {formatDate} from '@angular/common';
import {CommonService} from '../services/common.service';
declare const $;

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @ViewChild('gmap') gmapElement: any;

  hidden = true;
  hiddenAgent = true;
  detailsId: string;
  details: any;
  detailsImages: any;
  smallCarouselData = [];
  bigCarouselData = [];
  marker = {
    url: '../../assets/sml_map_icon.png',
    scaledSize: {
      width: 30,
      height: 40
    }
  };
  lng;
  lat;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    public commonService: CommonService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.detailsId = params.id;
    });

    if (this.detailsId) {
      this.getDetailsData(this.detailsId);
    }
  }

  getMapInfo(details): any {
    const detailsAddress = details.address;
    const key = 'AIzaSyDQRqRozL-HBOpgBgOt2hxyXo9l3Tc4LCY';
    const address = `${detailsAddress.addressLine1},${detailsAddress.cityName},${detailsAddress.stateCode},${detailsAddress.countryCode},${detailsAddress.mailCode}`;
    // const address = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
      .subscribe((response: any) => {
         if (response.results[0] && response.results[0].geometry && response.results[0].geometry.location) {
           this.lat = response.results[0].geometry.location.lat;
           this.lng = response.results[0].geometry.location.lng;
         }
      });
  }

  tourOverlay(): any {
    if (this.hidden) {
      this.hidden = false;
    }
  }

  agentOverlay(): any {
    if (this.hiddenAgent) {
      this.hiddenAgent = false;
    }
  }

  closeForm(): any {
    this.hidden = true;
    this.hiddenAgent = true;
  }

  closeAgent(): any {
    this.hiddenAgent = true;
  }

  setCarousel(): any {
    this.bigCarouselData.forEach((img) => {
      document.getElementById('sync1').innerHTML = document.getElementById('sync1').innerHTML + `<div class='item'><img src='${img.href}'></div>`;
    });
    this.smallCarouselData.forEach((img) => {
      document.getElementById('sync2').innerHTML = document.getElementById('sync2').innerHTML + `<div class='item sm-carousel-item'><img src='${img.href}'></div>`;
    });
    const sync1 = $('#sync1');
    const sync2 = $('#sync2');
    const slidesPerPage = 4;

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
      dots: false,
      loop: true,
      responsiveRefreshRate: 200,
      navText: ['<img src="../../assets/icons/carousel_left.png">', '<img src="../../assets/icons/carousel_right.png">']
    }).on('changed.owl.carousel', syncPosition);

    sync2
      .on('initialized.owl.carousel', () => {
        sync2.find('.owl-item').eq(0).addClass('current');
      })
      .owlCarousel({
        items: slidesPerPage,
        dots: false,
        nav: true,
        smartSpeed: 200,
        slideSpeed: 500,
        navRewind: false,
        slideBy: slidesPerPage,
        responsiveRefreshRate: 100,
        margin: 10,
        navText: ['<img src="../../assets/icons/left_small.png">', '<img src="../../assets/icons/right_small.png">']
      });

    function syncPosition(el) {
      const count = el.item.count - 1;
      let current = Math.round(el.item.index - (el.item.count / 2) - .5);

      if (current < 0) {
        current = count;
      }
      if (current > count) {
        current = 0;
      }

      sync2
        .find('.owl-item')
        .removeClass('current')
        .eq(current)
        .addClass('current');
      const onscreen = sync2.find('.owl-item.active').length - 1;
      const start = sync2.find('.owl-item.active').first().index();
      const end = sync2.find('.owl-item.active').last().index();

      if (current > end) {
        sync2.data('owl.carousel').to(current, 100, true);
      }
      if (current < start) {
        sync2.data('owl.carousel').to(current - onscreen, 100, true);
      }
    }

    sync2.on('click', '.owl-item', function(e) {
      const num = $(this).index();
      sync1.data('owl.carousel').to(num, 300, true);
    });
  }

  getDetailsData(id): void {
    const urlDetails = `http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements/${id}`;
    this.http.get(urlDetails).subscribe(
      (data) => {
        this.details = data;
        if (this.details.squareFeet) {
          this.details.squareFeet = this.details.squareFeet.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        }
        if (this.details.lotSize) {
          this.details.lotSize = this.details.lotSize.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        }
        if (this.details.leaseTerms && this.details.leaseTerms.length) {
          const bestDeal = this.details.leaseTerms.filter(deal => deal.defaultTerm);
          this.details.leaseTerms.bestDeal = bestDeal.length ? bestDeal[0] : null;
          const allOtherDeals = this.details.leaseTerms.filter(deal => !deal.defaultTerm);
          this.details.leaseTerms.allOtherDeals = allOtherDeals;
        }
        this.getMapInfo(this.details);
      },
      (err) => {
        console.log(err);
      }
    );

    const urlImages = `http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements/${id}/images`;
    this.http.get(urlImages).subscribe(
      (data) => {
        this.detailsImages = data;
        if (this.detailsImages.detailsChosenImages && this.detailsImages.detailsCarouselImages) {
          this.bigCarouselData = this.detailsImages.detailsChosenImages;
          this.smallCarouselData = this.detailsImages.detailsCarouselImages;
          this.setCarousel();
        } else {
          document.getElementById('noImage').innerHTML =
            '<img style="width: 50%; margin: 0 auto" class="no-image-img" src="../../assets/empty_carousel.png">';
        }
      },
      (err) => {
        console.log(err);
        document.getElementById('noImage').innerHTML =
          '<img style="width: 50%; margin: 0 auto" class="no-image-img" src="../../assets/empty_carousel.png">';
      }
    );
  }

  navigateToGallery() {
    this.router.navigate([`/gallery/${this.detailsId}`]);
  }

}
