import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Guest } from './guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guestSource = new BehaviorSubject<Guest[]>(null);
  guestItems = this.guestSource.asObservable();
  private guests = [];

  constructor() {
    this.populateQr();
   }

   populateQr(){
     this.guests.forEach((g: Guest) => (g.qr = JSON.stringify({...g})));
   }

   addGuest(newGuest: Guest){
    this.guests.push(newGuest);
    this.guestSource.next(this.guests);
   }
}
