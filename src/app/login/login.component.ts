import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { AuthServicesService } from '../auth-services.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private authService: AuthServicesService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')]]
    });
   }

   get f() { return this.loginForm.controls; }
   onSubmit() {
    // Handle form submission here
    this.submitted = true;
    if (this.loginForm.invalid) {
      console.log("no data found");
      return;
    }
    let  userData= {
      email  : this.loginForm.value.email,
      password  : this.loginForm.value.password
    }
    console.log("email:"+ userData.email,"password:"+userData.password);
  }

  ngOnInit(): void {
    console.log(this.loginForm?.controls?.['password']?.errors?.['minLength'],"aaaaaaaaaa")

    // console.log(this.loginForm?.controls?.['password']['touched'],"aaaaaddaaaaa")
  }

}
