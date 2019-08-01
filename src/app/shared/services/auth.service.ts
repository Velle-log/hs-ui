import { Injectable } from '@angular/core';
import { User } from '../models/auth/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, SocialUser, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { HSAuthToken } from '../models/auth/hs-auth-token.model';
import { HSAuthRequestBuilder } from '../models/auth/hs-auth-request.model';
import { API_ENDPOINT, hsAuthTokenName, SocialAuthProviderName } from 'src/app/config/app.config';
import { Observable, of } from 'rxjs';
import { map, tap, catchError, flatMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

// TODO: use ngx-logger to replace console.log (dev/prod)
// TODO: think of using merge map in place of flat pipe map (JAT)
// TODO: reconsider void return type for refresh token and convert token

@Injectable({
  providedIn: 'root'
})
export class HSAuthService {
  public user: User = new User();
  private socialUser: SocialUser;

  constructor(private http: HttpClient, 
              private socialAuthService: AuthService,
              private _messageBar: MatSnackBar) {
  }

  public googleSignIn(): void {   // return observable for login
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
      if(user){
        this.socialUser = user;
        this.convertAuthToken(user);
      }
      else {
        this._messageBar.open("Unable to fetch social login details!", "Close", {
          duration: 2000, // TODO: Set to default duration
        })
      }
    }).catch((error) => {
      console.error(error.error);
    });
  }

  public facebookSignIn(): void { //return observable for login
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      if(user){
        this.socialUser = user;
        this.convertAuthToken(user);
      }
      else {
        this._messageBar.open("Unable to fetch social login details!", "Close", {
          duration: 2000, // TODO: Set to default duration
        })
      }
    }).catch((error) => {
      console.error(error.error);
    });
  }

  // Getters
  private getSessionToken(): HSAuthToken {
    return JSON.parse(sessionStorage.getItem(hsAuthTokenName)) as HSAuthToken;
  }
  
  // Setters
  private setSessionToken(hsAuthToken: HSAuthToken): void {
    sessionStorage.setItem(hsAuthTokenName, JSON.stringify(hsAuthToken));
  }

  // Delete
  private removeSessionToken() {
    sessionStorage.removeItem(hsAuthTokenName);
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

  // Token exchange methods
  public convertAuthToken(socialUser: SocialUser): void {
    const requestData = HSAuthRequestBuilder.social(socialUser);
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json'),
    };
    this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.CONVERT_TOKEN, requestData, httpOptions).subscribe((authToken) => {
      this.user.authToken = authToken;
      this.setSessionToken(authToken);
      console.log("Successfully converted token", authToken);
      location.reload();
    }, (error) => {
      console.error("We encountered an error while converting the token.", error);
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
      sessionStorage.removeItem(hsAuthTokenName);
    });
  }

  public credLogin(username: string, password: string): Observable<HSAuthToken> {
    console.log("cred login called");
    const requestData = HSAuthRequestBuilder.creds(username, password);
    const httpOptions = {
      headers: new HttpHeaders().set('Accept', 'application/json')
    };
    console.log(requestData);
    return this.http.post<HSAuthToken>(API_ENDPOINT.AUTH.GET_TOKEN, requestData, httpOptions).pipe(
      tap((authToken) =>{
        this.setSessionToken(authToken);
        this.tokenIsValid(authToken).subscribe((res) => {
          this._messageBar.open(`Successfully logged in as ${this.user.username}`,"Close",{
              duration: 2000,
            }
          )
        });
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
      this.http.post(API_ENDPOINT.AUTH.LOGOUT, requestData, httpOptions).subscribe((data) => {
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