import { Component, OnInit } from '@angular/core';
import { GuestService } from '../guest.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {
  guestList = this.gstService.guestItems;
  elementType: "url" | "canvas" | "img" = "url";

  constructor(private gstService: GuestService) { }

  ngOnInit(): void {
  }

}
