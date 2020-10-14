import { Component, OnInit } from '@angular/core';
import { NgForm,FormsModule,FormControl,FormGroup,Validators} from '@angular/forms';
import { Userservice} from '../../services/user.service';
import { User} from '../../models/user.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


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
          Swal.fire({
            title:'Whaouuu !',
            text:'Création de compte OK !',
            icon:'success',
            timer: 2000
          }) 
          setTimeout(()=>{
            this.router.navigate(['auth/signin']);
          },3000);
        }
        else{
          Swal.fire({
            title:'Ouppss...',
            text:'Problème identification',
            icon:'error',
            timer: 3000
          })
          this.error= true;
        }
      },error =>{
        Swal.fire({
          title:'Ouppss...',
          text:'Email déjà existant ou mot de passe incorrect',
          icon:'error',
          timer: 3000
        })
      })
    }
    else{
      Swal.fire({
        title:'Ouppss...',
        text:'Paramètres incorrect',
        icon:'error',
        timer: 3000
      })
    }
  }
}
