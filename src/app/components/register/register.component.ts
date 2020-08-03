import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Global } from '../../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;
  public url: string;
  public user: User;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.url = Global.url;
    this.user = new User('','','','');
  }

  ngOnInit(){
  }

  userRegister(){
    this._authService.register(this.user).subscribe(
      response => {
        this._authService.setToken(response.token)
        this._router.navigate(['/sobre-mi']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
