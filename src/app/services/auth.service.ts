import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../services/global';
import { Router } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { User } from '../models/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable ({ providedIn: 'root'})

export class AuthService{
    public url: string;
    public user: User;

    constructor(
        private _http: HttpClient,
        private router: Router,
        private cookie: CookieService
    ){
        this.url = Global.url;
    }

    login(user): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        
        return this._http.post(this.url+'singin', params, {headers: headers});
    }

    register(user): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.post(this.url+'singup', params, {headers: headers});
    }

    setToken(token: string){
        this.cookie.set("token", token);
    }

    getToken(): String{
        return this.cookie.get("token");
    }

    getPayLoad(){
        return jwt_decode(this.getToken());
    }

    loggedIn(): Boolean{
        if(this.getToken()){
            return true;
        }
    }

    logOut(){
        this.cookie.deleteAll();
        return this.router.navigate(['/login']);
    }

    getUser(user){
        return this._http.get(this.url+'getuser', user);
    }

    setAdmin(role: string){
        this.cookie.set("role", role);
    }

    getAdmin(){
        return this.cookie.get("role");
    }

    authAdmin(){
        const role = this.getAdmin();
        if(this.loggedIn()){
            if(role !== 'basic'){
                return true;
            }
        }
    }
}