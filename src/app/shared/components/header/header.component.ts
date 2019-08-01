import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthModalContent } from '../auth-modal/auth-modal.component';
import { HSAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(public authModal: MatDialog, private hsAuthService: HSAuthService) { }

  ngOnInit() {
  }

  openAuthModal() {
    const authModalRef = this.authModal.open(AuthModalContent);
    // TODO: Add reset auth modal on 
    // authModalRef.afterClosed().subscribe(result => console.log("The Auth Modal is closed!"));
  }

  logout() {
    this.hsAuthService.logout();
  }

  // getter functions
  getIsAuthenticated(): Boolean {
    return this.hsAuthService.user.isAuthenticated;
  }

}
