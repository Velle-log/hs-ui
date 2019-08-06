import { Injectable } from '@angular/core';
import { User } from '../models/auth/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, SocialUser } from 'angularx-social-login';
import { HSAuthToken } from '../models/auth/hs-auth-token.model';
import { HSAuthRequestBuilder } from '../models/auth/hs-auth-request.model';
import { API_ENDPOINT, HS_AUTH_TOKEN_NAME, SocialAuthProviderName } from 'src/app/config/app.config';
import { Observable, of, from } from 'rxjs';
import { map, tap, flatMap, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

// TODO: reconsider void return type for refresh token and convert token
// TODO: use take(n) for efficiency
// TODO: create http option builder

@Injectable({
  providedIn: 'root'
})
export class HSAuthService {
  public user: User = new User();

  constructor(private http: HttpClient, 
              private socialAuthService: AuthService,
              private _messageBar: MatSnackBar) {}

  public socialSignIn(provider: string): Observable<SocialUser> {
    return from(this.socialAuthService.signIn(provider));
  }
  
  // Getters
  private getSessionToken(): HSAuthToken {
    return JSON.parse(sessionStorage.getItem(HS_AUTH_TOKEN_NAME)) as HSAuthToken;
  }
  
  // Setters
  private setSessionToken(hsAuthToken: HSAuthToken): void {
    sessionStorage.setItem(HS_AUTH_TOKEN_NAME, JSON.stringify(hsAuthToken));
  }

  // Delete
  private removeSessionToken() {
    sessionStorage.removeItem(HS_AUTH_TOKEN_NAME);
  }
  
  // Auth Check methods
  public isAuthenticated(): Observable<Boolean> {
    let authToken: HSAuthToken = this.getSessionToken();
    if(authToken)
      return this.tokenIsValid(authToken);
    else
      return of(false);
  }
  
  public tokenIsValid(authToken: HSAuthToken): Observable<Boolean> {
    let headers = new HttpHeaders().set('Authorization', `${authToken.tokenType} ${authToken.accessToken}`)
                                    .set('Accept', 'application/json');
    let httpOptions = {
      headers: headers
    };
    return this.http.get<User>(API_ENDPOINT.AUTH.GET_USER, httpOptions).pipe(
      flatMap((user) => {
      if(user){
        this.user = user;
        this.user.authToken = authToken;
        this.user.isAuthenticated = true;
      }
      return of(!!user);
    }));
  }

  public socialAuthCheck(provider: SocialAuthProviderName): Observable<Boolean> {
    let authState = this.socialAuthService.authState;
    authState.subscribe((user) => {
      if(user){
        if(user.provider == provider){
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

  // Token exchange methods
  public convertAuthToken(socialUser: SocialUser): Observable<Boolean> {
    const requestData = HSAuthRequestBuilder.social(socialUser);
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    };
    return new Observable(subscriber => {
      this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.CONVERT_TOKEN, requestData, httpOptions).subscribe((authToken) => {
        this.user.authToken = authToken;
        this.setSessionToken(authToken);
        this.user.isAuthenticated = true;
        subscriber.next(true);
        subscriber.complete();
      }, (error) => {
        console.error("We encountered an error while converting the token.", error);
        subscriber.error(error);
        subscriber.complete();
      });
    });
  }

  public refreshAuthToken(authToken: HSAuthToken): void {
    const requestData = HSAuthRequestBuilder.refresh(authToken);
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    };
    this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.GET_TOKEN, requestData, httpOptions).subscribe((authToken)=>{
      this.setSessionToken(authToken);
      this.tokenIsValid(authToken);
    }, (error) => {
      console.error(`Failed to refresh Token. Error: `, error.error);
      sessionStorage.removeItem(HS_AUTH_TOKEN_NAME);
    });
  }

  public credLogin(username: string, password: string): Observable<HSAuthToken> {
    const requestData = HSAuthRequestBuilder.creds(username, password);
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    };
    return this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.GET_TOKEN, requestData, httpOptions).pipe(
      tap((authToken) =>{
        this.setSessionToken(authToken);
        this.tokenIsValid(authToken).subscribe((res) => {});
      }));
  }

  // Invalidate token methods
  public logout(): void {
    const authToken: HSAuthToken = this.getSessionToken();
    if(this.user.authToken || authToken){
      const requestData = HSAuthRequestBuilder.logout(this.user.authToken || authToken);
      const httpOptions = {
        headers: new HttpHeaders().set('Accept', 'application/json')
      };
      this.http.post(API_ENDPOINT.AUTH.LOGOUT, requestData, httpOptions).pipe(take(1)).subscribe((data) => {
        this._messageBar.open("Successfully Logged out!", "Close", {
          duration: 2000
        })
      }, (error) => {
        console.error(`Unable to login. ${error}`);
      });
      this.removeSessionToken();
      this.user = new User();
    }
  }

}
