import { Component, OnInit } from '@angular/core';
import { SocialUser, AuthService } from 'angularx-social-login';
import { HSAuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Hire Smart';
  private user: SocialUser;
  private isAuthenticated: boolean;

  constructor(private socialAuthService: AuthService, private hsAuthService: HSAuthService) { }

  ngOnInit() {
    this.hsAuthService.isAuthenticated();
  }
}
