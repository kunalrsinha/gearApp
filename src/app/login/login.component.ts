import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServicesService } from '../auth-services.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loading: boolean = false;
  constructor(private router: Router,private formBuilder: FormBuilder, private authService: AuthServicesService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]]
    });
  }

  get f() { return this.loginForm.controls; }
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
  helper = new JwtHelperService();
  onSubmit() {
    // Handle form submission here
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log("no data found");
      return;
    }
    let userData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.loading = true;
    this.authService.login(userData).subscribe((userDetails: any) => {
      if (userDetails && userDetails.status == 200 && userDetails.data != '' && userDetails.data != undefined) {
        setTimeout(() => { this.loading = false; }, 1000)
        console.log("token1", userDetails.token);
        localStorage.setItem('userToken', userDetails.token)

        let resultData = this.helper.decodeToken(userDetails.token);
        localStorage.setItem('userRole', resultData.role)
        localStorage.setItem('userId', resultData.user_id)
        this.successNotification(userDetails.message)
      }
      else {
        this.alertNotification(userDetails.message)
      }
    })
  }

  forgetPassword() {
    const navigationDetails: string[] = ['auth/forgot-password'];
    this.router.navigate(navigationDetails);
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }

  ngOnInit(): void {
    // console.log(this.loginForm?.controls?.['password']?.errors?.['minLength'],"aaaaaaaaaa")
  }

}
