import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  apiUrl=environment.apiUrl;

  user() {
    throw new Error('Method not implemented.');
  }

  httpOptionsuserList = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Token': `${localStorage.getItem('lmToken')}`,
      'responseType': 'json',
    }),
  }

  constructor(private httpClient: HttpClient, private _router: Router) { }

  // login API
  login(obj: { email: any; password: any; }) {
    return this.httpClient.post(`${this.apiUrl}/login`, obj);
  }

  // forget password
  forgetPassword(obj: { email: any }) {
    return this.httpClient.post(`${this.apiUrl}/forgetPassword`, obj);
  }

  // signup  API
  signup(obj:{name:any;email:any;password:any}){
    return this.httpClient.post(`${this.apiUrl}/userList`, obj);
  }

  // logout API
  logout() {
    localStorage.removeItem('lmToken')
    localStorage.removeItem('role')
    this._router.navigate(['/'])
  }

  // local storage token for logged in user
  loggedIn() {
    try {
      return !!localStorage.getItem('lmToken')
    } catch {
      return false
    }
  }

  // get token from local storage
  getToken() {
    try {
      return localStorage.getItem('lmToken')
    } catch {
      return ''
    }
  }


}
