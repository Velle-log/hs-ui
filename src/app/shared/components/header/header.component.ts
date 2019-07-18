import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthModalContent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  constructor(public authModal: MatDialog) { }

  openAuthModal() {
    const authModalRef = this.authModal.open(AuthModalContent);
    // TODO: Add reset auth modal on 
    // authModalRef.afterClosed().subscribe(result => console.log("The Auth Modal is closed!"));
  }

  ngOnInit() {
  }

}
