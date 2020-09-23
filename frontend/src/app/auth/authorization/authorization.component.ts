import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  authUser: boolean;

  constructor(private authService: AuthService,
              private router: Router) {  }

  ngOnInit(): void {
  }
  onSignIn(){
    this.authService.signIn().then(()=>{
      this.authUser= this.authService.isAuth;
      this.router.navigate(['/forum']);
    }
    )
  }

  onSignOut(){
    this.authService.signOut();
    this.authUser= this.authService.isAuth;
  }
}
