import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserService {
  URL: string;
  constructor(private http: Http) {
    console.log('Hello UserService Provider');
  }
  Login(userName: string, passWord: string) {
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    this.URL = 'http://das.51youpu.com/login?v=5.2.2&d=96&c=1&t=1';
    let body = 'username=' + userName + '&password=' + passWord;
    return new Promise((resolve, reject) => {
      this.http.post(this.URL, body, options)
        .map(res => res.json())
        .subscribe(data => resolve(data), err => reject(err))
    })
  } 
  Logout() {
    this.URL =  'http://das.51youpu.com/logout';
    return new Promise((resolve, reject) => {
      this.http.get(this.URL)
        .map(res => res.json())
        .subscribe((data) => resolve(data), err => reject(err));
    })
  }
}

