import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Userservice } from '../../services/user.service';
import { NgForm,FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User;
  error: boolean;

  constructor(private userservice: Userservice,
              private authService: AuthService,
              private router: Router) {
    this.user= new User();
   }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.user.email != null  && this.user.password != null){
      this.userservice.loginUser(this.user).subscribe(response =>{
        if(response.userId != null){
          this.error= false;
           //A modifié pour afficher un message d'alerte //
        }
        else{
          this.error= true;
        }
      },error =>{
        console.log(error.error)
        this.error= true;
      })
    }
    else{
      this.error= true
    }
  }

}
