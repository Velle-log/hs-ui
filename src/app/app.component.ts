import { Component, OnInit } from '@angular/core';
import { HSAuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'Hire Smart';

  constructor(private hsAuthService: HSAuthService) { }

  ngOnInit() {
    this.hsAuthService.isAuthenticated().subscribe((flag: Boolean) => {
      if(flag)
        console.log("Successfully restored session!");
      else 
        console.log("No session found");
    });
  }
}
