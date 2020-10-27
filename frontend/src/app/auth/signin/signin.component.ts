import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Userservice } from '../../services/user.service';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user: User;
  error: boolean;
  authUser: boolean;

  constructor(private userservice: Userservice,
              private router: Router) {
    this.user= new User();
   }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.user.email != null  && this.user.password != null){
      this.userservice.loginUser(this.user).subscribe(response =>{
        if(response.userId != null){
            this.userservice.saveUser(response);
            Swal.fire({
              title:'Youpiiii !',
              text:'Authentification réussi',
              icon:'success',
              timer: 2000
            })
            setTimeout(()=>{
              window.location.href="http://localhost:4200/auth/me";
              /* this.router.navigate(['/auth/me']); */
            },3000)
        }
        else{
          Swal.fire({
            title:'Oopss..',
            text:'Error identification !',
            icon:'error'
          })
        }
      },error =>{
        Swal.fire({
          title:'Oopss..',
          text:'Adresse mail ou mot de passe incorrect',
          icon:'error'
        })
      })
    }
    else{
      Swal.fire({
        title:'Oopss..',
        text:'Paramètre invalide !',
        icon:'error'
      })
    }
  }

}
