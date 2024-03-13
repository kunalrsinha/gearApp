import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
   }


   onSubmit() {
    // Handle form submission here
    console.log(this.loginForm.value);
  }

  ngOnInit(): void {
    console.log(this.loginForm?.controls?.['email']?.['errors']?.['email'],"aaaaaaaaaa")
    // console.log(this.loginForm?.controls?.['password']['touched'],"aaaaaddaaaaa")
  }

}
