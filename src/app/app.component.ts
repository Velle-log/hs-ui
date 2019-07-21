import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Hire Smart';
  private user: SocialUser;
  private isAuthenticated: boolean;

  constructor(private socialAuthService: AuthService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isAuthenticated = (user != null);
      // Dummy Flow
      // TODO: With the fields returned store them in Cookies? or local maybe
      console.log(user);
    })
  }
}
