import { Component, OnInit } from '@angular/core';
import { ListingsService } from '../listings.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import {formatDate} from '@angular/common';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-realestate-list',
  templateUrl: './realestate-list.component.html',
  styleUrls: ['./realestate-list.component.css']
})
export class RealestateListComponent implements OnInit {
  public realEstateData;
  private isData;
  private par;
  private qeryPar;
  private isQeryPar;

  pageAdvertisementArray: any = [];

  constructor(
    private service: ListingsService,
    private route: ActivatedRoute,
    private router: Router,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.pageAdvertisementArray = this.service.getAdvertisementsArray();

    const combined = combineLatest([this.route.params, this.route.queryParams]);

    combined.subscribe(
      ([params, queryParams]) => {
        this.par = params.adtype.toUpperCase();

        if (queryParams.realestatetype) {
          this.isQeryPar = true;
          this.qeryPar = queryParams.realestatetype !== 'townhomes' ?
            (queryParams.realestatetype + 's').toUpperCase() :
            queryParams.realestatetype.toUpperCase();
          const url = `http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements?realEstateTypeName=${queryParams.realestatetype}&adTypeName=${params.adtype}`;

          if (this.qeryPar === 'VACATIONS') {
            this.qeryPar = 'VACATION RENTALS';
          }

          if (this.qeryPar === 'PORTABLES') {
            this.qeryPar = 'PORTABLE CONSTRUCTIONS';
          }

          this.getDataFromApi(url);
        } else {
          this.isQeryPar = false;
          const url = `http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements?adTypeName=${params.adtype}`;

          this.getDataFromApi(url);
        }
      }
    );
  }

  getDataFromApi(url) {
    this.service.getAdvertisements(url).subscribe(
      (response) => {
             this.realEstateData = response;
             this.isData = this.realEstateData.length > 0;
             if (this.isData) {
               if (this.isQeryPar) {
                 this.hideNoDataMessage();
                 document.getElementById('home-lease-title').innerText = `${this.qeryPar} FOR ${this.par}`;
               } else {
                 this.hideNoDataMessage();
                 document.getElementById('home-lease-title').innerText = `REAL ESTATE FOR ${this.par}`;
               }
             } else {
               this.checkQueryParam();
             }
            },
      (err) => {
              this.checkQueryParam();
           }
    );
  }
  showNoDataMessage() {
    document.getElementById('no-data-container').style.display = 'block';
    document.getElementById('home-lease-title').style.display = 'none';
    document.getElementById('lease-properties').style.display = 'none';
  }

  hideNoDataMessage() {
    document.getElementById('no-data-container').style.display = 'none';
    document.getElementById('home-lease-title').style.display = 'block';
    document.getElementById('lease-properties').style.display = 'flex';
  }
  checkQueryParam() {
    if (this.isQeryPar) {
      this.qeryPar = this.qeryPar[0] + this.qeryPar.slice(1).toLocaleLowerCase();
      this.par = this.par[0] + this.par.slice(1).toLocaleLowerCase();
      this.showNoDataMessage();
      document.getElementById('home-lease-nodata-title').innerText = `SORRY, THE CRITERIA YOU ARE SEARCHING IS NOT MATCHING OUR RECORDS`;
      document.getElementById('home-lease-nodata-text').innerText = `Start My Lease® currently does not have any listings matching your criteria. Please check back with us later.`;
    } else {
      this.showNoDataMessage();
      document.getElementById('home-lease-nodata-title').innerText = `SORRY, THE CRITERIA YOU ARE SEARCHING IS NOT MATCHING OUR RECORDS`;
      document.getElementById('home-lease-nodata-text').innerText = `Start My Lease® currently does not have any listings matching your criteria. Please check back with us later.`;
    }
  }

  openAddress(address) {
    const url = `${address.addressLine1} ${address.cityName}, ${address.stateCode} ${address.mailCode}, ${address.countryCode}`;
    window.open(`http://maps.google.com/?q= ${url}`, '_blank');
  }

  moreDetails(property) {
    this.router.navigate([`/details/${property.id}`]);
  }

}
