import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/auth/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { HSAuthToken } from '../models/auth/hs-auth-token.model';
import { HSAuthRequestBuilder } from '../models/auth/hs-auth-request.model';
import { API_ENDPOINT, hsAuthTokenName, SocialAuthProviderName } from 'src/app/config/app.config';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// TODO: use ngx-logger to replace console.log (dev/prod)

@Injectable({
  providedIn: 'root'
})
export class HSAuthService {
  public user: User = new User();
  private socialUser: SocialUser;

  constructor(private http: HttpClient, private socialAuthService: AuthService) {
  }

  public googleSignIn(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthCheck(SocialAuthProviderName.GOOGLE);
  }

  public facebookSignIn(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialAuthCheck(SocialAuthProviderName.FACEBOOK);
  }

  public isAuthenticated(): Observable<Boolean> | Boolean {
    let authToken: HSAuthToken = JSON.parse(sessionStorage.getItem(hsAuthTokenName));
    if(authToken)
      return this.tokenIsValid(authToken);
    else
      return false;
  }

  public tokenIsValid(authToken: HSAuthToken): Observable<Boolean> {
    let headers = new HttpHeaders().set('Authorization', `${authToken.tokenType} ${authToken.accessToken}`)
                                    .set('Accept', 'application/json');
    let httpOptions = {
      headers: headers
    };
    let valid = new Observable<Boolean>();
    let userReq = this.http.get<User>(API_ENDPOINT.AUTH.GET_USER, httpOptions);
    userReq.subscribe((user) => {
      if(user){
        this.user = user;
        this.user.authToken = authToken;
        this.user.isAuthenticated = true;
      }
    }, (error) => {
      this.refreshAuthToken(authToken);
    }); 
    return userReq.pipe(map(user => !!user));
  }

  public socialAuthCheck(provider: SocialAuthProviderName): Observable<Boolean> {
    let authState = this.socialAuthService.authState;
    authState.subscribe((user) => {
      if(user){
        if(user.provider == provider){
          this.socialUser = user;
          this.convertAuthToken(user);
          console.warn(`User retrieved from ${provider} <=> ${user.provider}`);
        }
        else
          console.warn(`Provider mismatch! Expected ${provider}, found ${user.provider}`);
      }
      else 
        console.warn(`Could not retrieve social user from ${provider}`);
    }, (error) => {
      console.log(`No social user available: ${error}`);
    });
    return authState.pipe(map(user => !!user));
  }

  public convertAuthToken(socialUser: SocialUser): void {
    let requestData = HSAuthRequestBuilder.social(socialUser);
    let httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    };
    this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.CONVERT_TOKEN, requestData, httpOptions).subscribe((authToken) => {
      this.user.authToken = authToken;
      sessionStorage.setItem(hsAuthTokenName, JSON.stringify(authToken));
      console.log("Successfully converted token", authToken);
      location.reload();
    }, (error) => {
      console.error("We encountered an error while converting the token.", error);
    });;
  }

  public refreshAuthToken(authToken: HSAuthToken) {
    let requestData = HSAuthRequestBuilder.refresh(authToken);
    let httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    };
    this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.GET_TOKEN, requestData, httpOptions).subscribe((authToken)=>{
      this.tokenIsValid(authToken);
    }, (error) => {
      console.error(`Failed to refresh Token. Error: ${error}`);
      sessionStorage.removeItem(hsAuthTokenName);
    });
  }

  public logout(): void {
    let authToken: HSAuthToken = JSON.parse(sessionStorage.getItem(hsAuthTokenName));
    if(this.user.authToken || authToken){
      let requestData = HSAuthRequestBuilder.logout(this.user.authToken || authToken);
      let httpOptions = {
        headers: new HttpHeaders().set('Accept', 'application/json')
      };
      this.http.post(API_ENDPOINT.AUTH.LOGOUT, requestData, httpOptions).subscribe((data) => {
        console.log("Successfully logged out!");
      }, (error) => {
        console.error(`Unable to login. ${error}`);
      });
      sessionStorage.removeItem(hsAuthTokenName);
      this.user = new User();
    }
  }


}