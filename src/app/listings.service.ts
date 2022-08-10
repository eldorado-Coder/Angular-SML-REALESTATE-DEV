import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {
  // URLs and endpoints
  advertisementURL: string = 'http://ec2-54-205-246-58.compute-1.amazonaws.com:8080/api/v1/realestate/advertisements';
  // advertisementEndpoint: string = `${this.advertisementURL}`;

  mailCode: any = 48009;

  // arrays
  advertisementsArray: any = [];

  constructor(private http: HttpClient) { }


  // getting all advertisements from api
  getAdvertisements(url): Observable<any> {
    return this.http.get<any>(url);
  }
  // adding advertisements to array
  addAdvertisements(ad: any): any {
    this.advertisementsArray = [];
    this.advertisementsArray.push(ad);

  }

  // getting the array
  getAdvertisementsArray(): any {
    return this.advertisementsArray;

  }
}
