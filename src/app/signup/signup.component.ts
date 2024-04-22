import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServicesService } from '../auth-services.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  constructor(private router: Router,private formBuilder: FormBuilder, private authService: AuthServicesService) {
    this.signUpForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]]
    });
  }
  get f() { return this.signUpForm.controls; }
  successNotification(message: any) {
    Swal.fire({
      text: message,
      icon: "success",
      buttonsStyling: !1,
      confirmButtonText: "Ok, got it!",
      customClass: { confirmButton: "btn btn-primary" }
    }).then(() => {
      console.log('triggered redirect here');
    })
  }
  alertNotification(message: any) {
    Swal.fire({
      text: message,
      icon: "warning",
      buttonsStyling: !1,
      confirmButtonText: "Ok, got it!",
      customClass: { confirmButton: "btn btn-primary" }
    })
  }
  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      console.log("no data found");
      return;
    }
    let userData = {
      name : this.signUpForm.value.fname,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }
    this.loading = true;
    this.authService.signup(userData).subscribe((userDetails: any) => {
      // console.log(userDetails,"test123");
      if (userDetails && userDetails.status == 200 && userDetails.data != '' && userDetails.data != undefined) {
        setTimeout(() => { this.loading = false; }, 1000);
        this.successNotification(userDetails.message);
      }
      else {
        this.alertNotification(userDetails.message)
      }
    })
  }
  ngOnInit(): void {
  }

}
