import { Component, OnInit } from '@angular/core';
import { NgForm,FormsModule,FormControl,FormGroup,Validators} from '@angular/forms';
import { Userservice} from '../../services/user.service';
import { User} from '../../models/user.model';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: User;
  error: boolean;

  constructor(private Userservice: Userservice,
              private router: Router) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    if(this.user.email.length > 0 && this.user.password.length > 0 &&  this.user.username.length > 0){
      this.Userservice.postUser(this.user).subscribe(response =>{
        if(response.userId != null){
          this.user = new User();//A modifié pour afficher un message d'alerte //
          this.error = false ; 
          setTimeout(()=>{
            this.router.navigate(['auth/signin']);
          },3000);
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
      this.error= true;
    }
  }
}
