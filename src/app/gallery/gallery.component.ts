import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  hidden: boolean = true;
  hiddenAgent: boolean = true;
  hiddenTour: boolean = true;
  showArrow: boolean = false;
  galleryId: string;
  galleryImages: any;
  galleryImagesPreview: any;
  gallerySlideIndex = 0;
  showImages = true;
  addressBack: string;

  @HostListener('window:scroll', ['$event'])
  showUpArrow(event) {
    this.showArrow = window.pageYOffset > 0;
  }

  @HostListener('window:resize', ['$event'])
  calcArrowPosition(event) {
    this.calculateArrowPosition(event.target.innerWidth);
  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.galleryId = params.id;
    });

    if (this.galleryId) {
      this.getGalleryData(this.galleryId);
    }
    document.addEventListener('keyup', ev => {
      if (ev.key === 'ArrowRight') {
        this.plusSlides(1);
      }
      if (ev.key === 'ArrowLeft') {
        this.plusSlides(-1);
      }
    });
    if (document.getElementById('gallery-page-gallery')) {
      this.calculateArrowPosition(document.getElementById('gallery-page-gallery').offsetWidth);
    }
  }
  ngAfterViewInit(): void {
    document.getElementById('overlay').classList.add('overlay');
  }

  overlayPic(): any {
    if (this.hidden) {
      this.hidden = false;
    }
  }

  calculateArrowPosition(windowWidth): any {
    const galleryWidth = windowWidth >= 992 ? 75 : 80;
    const margin = windowWidth >= 992 ? 60 : 40;
    const sideWidth = ((windowWidth / 100) * galleryWidth) + margin;
    const rightMargin = (((windowWidth - sideWidth) / 2) - 50) / 2;
    document.getElementById('arrow-up-container').style.right = rightMargin + 'px';
  }

  tourOverlay(): any {
    if (this.hiddenTour) {
      this.hiddenTour = false;
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

  closeOverlay(): any {
    this.hidden = true;
  }
  showSlides(slide): any {
    let i;
    const slides = document.getElementsByClassName('slides') as HTMLCollectionOf<HTMLElement>;

    if (slide >= slides.length) {
      this.gallerySlideIndex = 0;
    }
    if (slide < 0) {
      this.gallerySlideIndex = slides.length - 1;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    slides[this.gallerySlideIndex].style.display = 'block';
  }

  setCurrentSlide(slide): any {
    this.overlayPic();
    this.gallerySlideIndex = slide;
    this.showSlides(this.gallerySlideIndex);
  }

  plusSlides(n, ev?): any {
    if (ev) {
      ev.stopPropagation();
    }
    this.gallerySlideIndex += n;
    this.showSlides(this.gallerySlideIndex);
  }

  scrollUp(): any {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
      },
      (err) => {
        console.log(err);
      }
    );
    const urlImages = `http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements/${id}/images`;
    this.http.get(urlImages).subscribe(
      (data: any) => {
        if (data.galleryGridImages && data.galleryGridImages.length && data.galleryChosenImages && data.galleryChosenImages.length) {
          this.galleryImages = data.galleryGridImages;
          this.galleryImagesPreview = this.galleryImages.map(img => {
            return data.galleryChosenImages.filter(image => image.sequenceNumber === img.sequenceNumber)[0];
          });
          this.showImages = true;
        } else {
          this.showImages = false;
        }
      },
      (err) => {
        console.log(err);
        this.showImages = false;
      });
  }

  goBack(): void {
    this.router.navigate([`/details/${this.galleryId}`]);
  }

  checkStreetView(): void {
    this.router.navigate([`/street-view/${this.galleryId}`]);
  }
}
