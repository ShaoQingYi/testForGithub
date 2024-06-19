import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {AppComponent} from '../app.component';
import {ActivatedRoute, Router} from '@angular/router';
import { loginUserEntity } from '../loginUserEntity';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService,
             private appComponent: AppComponent,
             private router: Router,
             private route: ActivatedRoute,
  ) { }

  login_user: string = "";
  login_pwd: string = "";

  responseMsg?:any;
  msg?: String;

  isLogin: boolean = false;

  loginuser = new loginUserEntity("","");

  ngOnInit(): void {
  }

  onSubmit() { 
    this.msg = "";
    this.login(this.login_user, this.login_pwd);
  }

  login(username: string, password: string): void {
    this.loginuser.userName = username;
    this.loginuser.pwd = password;

    this.loginService.login(this.loginuser).subscribe(
      // localStorage.setItem('token', response.token);
      // 处理登录成功后的逻辑，如导航到其他页面

      (data) => {
      this.responseMsg = data;

      if(this.responseMsg.msg == "OK"){
        this.appComponent.ngOnInit();
        setTimeout(() => {
          this.router.navigate(['/dashboard'], {relativeTo: this.route});
          this.loginService.setIsLogin(true);
        }, 10); // 延迟10毫秒
      } else {
        this.msg = "密码错误！！";
        this.loginService.setIsLogin(false);
      }

    }, error => {
      console.error('Login error:', error);
      // 处理登录失败后的逻辑
    });
  }
}
