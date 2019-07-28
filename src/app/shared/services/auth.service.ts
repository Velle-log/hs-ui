import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/auth/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HSAuthToken } from '../models/auth/hs-auth-token.model';
import { HSAuthRequestBuilder } from '../models/auth/hs-auth-request.model';
import { API_ENDPOINT, hsAuthTokenName } from 'src/app/config/app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HSAuthService implements OnInit {
  private user: User;
  private socialUser: SocialUser;

  constructor(private http: HttpClient, private socialAuthService: AuthService) {
    this.user = {
      email: "",
      username: "",
      name: "",
      authToken: undefined
    }
  }

  ngOnInit() {
  }

  public isAuthenticated(): Observable<Boolean> | Boolean {
    let authToken: HSAuthToken = JSON.parse(sessionStorage.getItem(hsAuthTokenName));
    if(authToken) {
      console.log(authToken);       // REMOVE
      return this.tokenIsValid(authToken);
    }
    else {
      return this.socialAuthCheck();
    }
  }

  public tokenIsValid(authToken: HSAuthToken): Observable<Boolean> | Boolean {
    let headers = new HttpHeaders().set('Authorization', `${authToken.tokenType} ${authToken.accessToken}`)
                                    .set('Accept', 'application/json')
                                    .set('Access-Control-Allow-Origin', '*');
    let httpOptions = {
      headers: headers
    };
    console.log(this.http.get<JSON>(API_ENDPOINT.AUTH.GET_USER, httpOptions).subscribe((user) => console.log(user))); //REMOVE
    return true;
  }

  public socialAuthCheck(): Observable<Boolean> | Boolean {
    this.socialAuthService.authState.subscribe((user) => {
      if(user){
        this.socialUser = user;
        console.log(user);    // REMOVE
        this.convertAuthToken(user);
      }
    });
    return true;
  }

  public convertAuthToken(socialUser: SocialUser) {
    let requestData = HSAuthRequestBuilder(socialUser);
    let httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
                                .set('Access-Control-Allow-Origin', '*'),
    };
    this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.CONVERT_TOKEN, requestData, httpOptions).subscribe((authToken) => {
      this.user.authToken = authToken;
      sessionStorage.setItem(hsAuthTokenName, JSON.stringify(authToken));
      console.log(authToken);    // REMOVE
    });;
  }
}
