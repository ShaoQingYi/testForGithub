import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginUserEntity } from './loginUserEntity';

import { serverUrl } from './serverUrl';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  isLogin: boolean = false;

  // TODO SpringBoot
  private serviceUrl = serverUrl;
  // private serviceUrl = 'http://5c0w777458.qicp.vip';

  login(loginUserDetail: loginUserEntity) {
    return this.http.post<any>(this.serviceUrl + '/hayLwork/login', loginUserDetail);
  }

  setIsLogin(isLoginFlg: boolean){
    this.isLogin = isLoginFlg;
  }

  getIsLogin(): boolean{
    return this.isLogin;
  }
}
