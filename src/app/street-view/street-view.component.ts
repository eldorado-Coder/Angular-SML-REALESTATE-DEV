import { Component, OnInit, ViewChild, Input, Inject, PLATFORM_ID } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { isPlatformBrowser } from '@angular/common';
declare const google: any;

@Component({
  selector: 'app-street-view',
  templateUrl: './street-view.component.html',
  styleUrls: ['./street-view.component.css']
})
export class StreetViewComponent implements OnInit {

  hiddenAgent = true;
  hiddenTour = true;
  galleryId: string;
  addressBack: string;
  longitude;
  latitude;
  isStreetView = true;

  @ViewChild('streetviewMap') streetviewMap: any;
  @ViewChild('streetviewPano') streetviewPano: any;
  @Input() zoom = 8;
  @Input() heading = 34;
  @Input() pitch = 10;
  @Input() scrollwheel = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId,
    private mapsAPILoader: MapsAPILoader) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.galleryId = params.id;
    });

    if (this.galleryId) {
      this.getGalleryData(this.galleryId);
    }
  }

  getMapInfo(details): any {
    const detailsAddress = details.address;
    const key = 'AIzaSyDQRqRozL-HBOpgBgOt2hxyXo9l3Tc4LCY';
    const address = `${detailsAddress.addressLine1},${detailsAddress.cityName},${detailsAddress.stateCode},${detailsAddress.countryCode},${detailsAddress.mailCode}`;
    this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`)
      .subscribe((response: any) => {
        if (response.results[0] && response.results[0].geometry && response.results[0].geometry.location) {
          this.latitude = response.results[0].geometry.location.lat;
          this.longitude = response.results[0].geometry.location.lng;
          this.displayStreetView();
        }
      });
  }

  displayStreetView(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        const streetViewService = new google.maps.StreetViewService();
        const STREETVIEW_MAX_DISTANCE = 50;
        const latLng = new google.maps.LatLng(this.latitude, this.longitude);
        streetViewService.getPanoramaByLocation(latLng, STREETVIEW_MAX_DISTANCE, (streetViewPanoramaData, status) => {
          if (status === google.maps.StreetViewStatus.OK) {
            // ok
            this.isStreetView = true;
            const center = { lat: this.latitude, lng: this.longitude };
            // tslint:disable-next-line:max-line-length
            const map = new google.maps.Map(this.streetviewMap.nativeElement, { center, zoom: this.zoom, scrollwheel: this.scrollwheel });

            const panorama = new google.maps.StreetViewPanorama(
              this.streetviewPano.nativeElement, {
                position: center,
                pov: { heading: this.heading, pitch: this.pitch },
                scrollwheel: this.scrollwheel
              });
            map.setStreetView(panorama);
          } else {
            // no street view available in this range, or some error occurred
            this.isStreetView = false;
          }
        });
      });
    }
  }

  tourOverlay(): any {
    if (this.hiddenTour) {
      this.hiddenTour = false;
      console.log('click');
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

  getGalleryData(id) {
    const urlDetails = `http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements/${id}`;
    this.http.get(urlDetails).subscribe(
      (data: any) => {
        if (data.address.addressLine2) {
          this.addressBack = `GO BACK TO ${data.address.addressLine1}, ${data.address.addressLine2}, ${data.address.cityName}, ${data.address.stateCode}, ${data.address.mailCode}`;
        } else {
          this.addressBack = `GO BACK TO ${data.address.addressLine1}, ${data.address.cityName}, ${data.address.stateCode}, ${data.address.mailCode}`;
        }
        this.getMapInfo(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkPhotos(): void {
    this.router.navigate([`/gallery/${this.galleryId}`]);
  }

  goBack(): void {
    this.router.navigate([`/details/${this.galleryId}`]);
  }

}
