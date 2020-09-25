import { Component, OnInit,DoCheck } from '@angular/core';
import { Userservice } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  userConnected: any;

  constructor (private Userservice: Userservice,
              private router: Router) {}

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.userConnected = this.Userservice.getSavedUser();
  }
  signOut(){
    this.Userservice.deconnectionUser(); 
    this.router.navigate(['/auth/signin']); 
  }
}
