import { Component, OnInit } from '@angular/core';
import { Guest } from '../guest.model';
import { GuestService } from '../guest.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;
  hasDevices: boolean;
  hasPermission: boolean;
  qrResult: Guest;
  guestExist: boolean;

  constructor(private gstService: GuestService) { }

  ngOnInit(): void {
  }

  //clears the qr code scanned
  clearResult(){
    this.qrResult = null;
  }

  //scans the qr code
  onCodeResult(result:string){
    this.guestExist = null;
    if(this.checkQrjson(result)){
      this.qrResult = JSON.parse(result);

    }
  }

  onHasPermission(has: boolean){

  }

  //checks if the qr code belongs to a valid guest
  checkInGuest(guestQr: string){
    this.gstService.guestItems.pipe(map(guests => guests.find((guest: Guest) => guest.id === guestQr)))
    .subscribe(guest => {
      if(guest !== null && guest!== undefined){
        this.guestExist = true;
      }else{
        this.guestExist = false;
      }
      this.clearResult();
      this.clearMessage();
    })
  }


  clearMessage() {
    setTimeout(() => {
      this.guestExist = null;
    }, 3000);
  }


  //checks for the qr code having right JSON format
  checkQrjson(qrString: string){
    if(/^[\],:{}\s]*$/.test(
      qrString
        .replace(/\\["\\\/bfnrtu]/g, "@")
        .replace(
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
          "]"
        )
        .replace(/(?:^|:|,)(?:\s*\[)+/g, "")
      )
    ){
      return true;
    }else {
      return false;
    }
  }

}
