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
  public edited = false;
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
      customClass: { confirmButton: "btn btn-danger" }
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }
    let obj = {
      email: this.forgetPasswordForm.value.email,
    }
    this.authService.forgetPassword(obj).subscribe((data: any) => {
      if (data && data.status == 200) {
        this.edited = true;
        this.successNotification(data.message)
      }
      else{
        this.alertNotification(data.message)
      }
    })
    this.submitted = false;
    this.forgetPasswordForm.reset();
  }
  onReset() {
    this.submitted = false;
    this.forgetPasswordForm.reset();
  }


}
