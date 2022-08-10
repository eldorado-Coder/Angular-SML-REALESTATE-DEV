import { Injectable } from '@angular/core';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  checkAvailableDate(availabilityDate) {
    const currentDate = new Date().getTime();
    if (currentDate >= new Date(availabilityDate).getTime()) {
      return 'Available';
    } else {
      return `Available ${formatDate(availabilityDate, 'MMMM d, yyyy', 'en')}`;
    }
  }
}
