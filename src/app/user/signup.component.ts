import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './signup.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left:10px;}
    .error input {background-color: #E3C3C5;}
    .eeror ::-webkit-input-placeholder { color: #999;}
    .error ::-moz-placeholder { color:#999;}
    .error :-moz-placeholder { color:#999;}
    .error :ms-input-placeholder { color: #999;}
  `]
})
export class SignUpComponent {
  isDirty = true;
  loginInvalid = false;
  userName;
  firstName;
  lastName;
  constructor(private router: Router, private auth: AuthService) {

  }

  saveUser(formValues) {
    this.auth.saveUser(formValues).subscribe(() => {
      this.isDirty = false;
      this.login(formValues);
    });
  }
  login(formValues) {
    this.auth.loginUser(formValues.userName, 'apple')
      .subscribe(res => {
        if (!res) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['movies']);
        }
      });
  }

  cancel() {
    this.router.navigate(['/movies']);
  }
}
