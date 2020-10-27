import { Component, OnInit } from '@angular/core';
import { Userservice} from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  user: User;
  
  constructor(private userService: Userservice,
              private router : Router) { 
     this.user = new User();
     this.user.id = this.userService.getSavedUser().userId;
     this.user.token = this.userService.getSavedUser().token; 
  }

  ngOnInit(): void {
    this.userService.getUser(this.user)
    .subscribe((response)=>{
      this.user.email = response.email;
      this.user.username = response.username;
    },error => {
       return error;
    })
  }

  update(){
    if(this.user.password.length > 0){
      this.userService.putUser(this.user)
      .subscribe((response)=>{
        Swal.fire({
          title:'Yes!!',
          text:'Mot de passe modifié !',
          icon:'success'
        })
        setTimeout(function(){
          location.reload(); 
        },2000);
      },error =>{
        Swal.fire({
          title:'Oopss..',
          text:'Mot de passe incorrect ou mot de passe identique !',
          icon:'error'
        })
      })
    }
  }

  delete(){
    this.userService.deleteUser(this.user)
    .subscribe((response) =>{
      if (response === 1 || response === "1"){
        this.userService.deconnectionUser();
        this.router.navigate(['/auth/signin']);
        Swal.fire({
          title:'Delete',
          text:'Votre compte a été supprimé !',
          icon:'warning'
        })
        setTimeout(function(){
          location.reload(); 
        },3000);
      }
    })
  }

}
