import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { UserService } from '@services/user.service';
import { SessionStorageService } from '@services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private userService: UserService,
    private sessionService: SessionStorageService
  ) { }

  signInForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isShowNotify: boolean = false;
  isLoading: boolean = false;
  messageLoginResponse: string = '* '
  login(){
    this.isLoading = true
    this.isShowNotify = false
    this.messageLoginResponse = '* '
    this.userService.login(this.signInForm.value).subscribe(
      (res) => {
        this.isLoading = false;
        this.sessionService.saveData("jwt_token", res.token)
        this.router.navigateByUrl('');
      },
      (err) => {
        this.isLoading = false;
          this.isShowNotify = true;
          this.messageLoginResponse = this.messageLoginResponse + "System error";
          this.sessionService.saveData("jwt_token", "No token")
          this.router.navigateByUrl('');
      }
    )
  }
}
