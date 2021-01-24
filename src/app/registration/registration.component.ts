import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuid } from "uuid";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
      const guest = {...this.registrationForm.value, id: uuid()};
      console.log(guest);
  }

}
