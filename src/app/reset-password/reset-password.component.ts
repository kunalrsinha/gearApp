import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServicesService } from '../auth-services.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  submitted = false;
  passMatchError: string = ''
  loading: boolean = false;
  token: string = '';
  constructor(private router: Router,private formBuilder: FormBuilder, private authService: AuthServicesService,private route: ActivatedRoute) { }

  get f() { return this.resetPasswordForm.controls; }
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
    if (this.resetPasswordForm.invalid) {
      return;
    }
    let pass1 = this.resetPasswordForm.value.password;
    let pass2 = this.resetPasswordForm.value.cpassword;
    if (pass1 != pass2) {
      this.passMatchError = 'Both Password should be same.'
    } else {
      this.passMatchError = ''
    }
    if (this.passMatchError == '') {
      let obj = {
        password: this.resetPasswordForm.value.password,
        token: this.token,
      }
      this.authService.resetPassword(obj).subscribe((data:any)=>{
        if (data.status == 200) {
          this.successNotification(data.message)
          this.router.navigate(['/']);

        } else {
          this.alertNotification(data.message)
        }
      })
    }
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]],
      cpassword: ['', [Validators.required]],
    });
  }

}
