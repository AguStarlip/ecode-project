import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { Global } from '../../services/global';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
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

  userLogin(){
    this._authService.login(this.user).subscribe(
      response => {
        this._authService.setToken(response.token);
        this._authService.setAdmin(response.user.role);
        this._router.navigate(['/sobre-mi']);
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
