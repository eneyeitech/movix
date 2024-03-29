import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styles: [`
  em { float:right; color:#E05C65; padding-left:10px;}`]
})
export class LoginComponent {
  userName;
  password;
  mouseoverLogin;
  loginInvalid = false;
  constructor(private authService: AuthService, private router: Router) {

  }
  login(formValues) {
    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe(res => {
        if (!res) {
          this.loginInvalid = true;
        } else {
            this.router.navigate(['movies']);
        }
      });
  }

  cancel() {
    this.router.navigate(['movies']);
  }
}
