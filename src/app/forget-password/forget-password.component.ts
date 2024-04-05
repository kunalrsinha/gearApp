import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthServicesService } from '../auth-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})


export class ForgotPasswordComponent implements OnInit {
  [x: string]: any;
  forgetPasswordForm!: FormGroup;
  submitted = false;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder,private router: Router,private authService: AuthServicesService) {
    // this.forgetPasswordForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]]
    // });
  }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  get f() { return this.forgetPasswordForm.controls; }

  // successNotification(message: any) {
  //   Swal.fire({
  //     text: message,
  //     icon: "success",
  //     buttonsStyling: !1,
  //     confirmButtonText: "Ok, got it!",
  //     customClass: { confirmButton: "btn btn-primary" }
  //   }).then(() => {
  //     console.log('triggered redirect here');
  //   })
  // }
  // alertNotification(message: any) {
  //   Swal.fire({
  //     text: message,
  //     icon: "warning",
  //     buttonsStyling: !1,
  //     confirmButtonText: "Ok, got it!",
  //     customClass: { confirmButton: "btn btn-primary" }
  //   })
  // }

  onSubmit() {
    if (this.forgetPasswordForm.valid) {
      // Form is valid, send reset password request
      const email = this.forgetPasswordForm.value.email;
      // Send reset password request to the backend
      console.log("Reset password request sent for email:", email);
    } else {
      // Form is invalid, display error messages or handle accordingly
      console.error("Form is invalid");
    }
  }



}
