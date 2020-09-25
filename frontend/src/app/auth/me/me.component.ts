import { Component, OnInit } from '@angular/core';
import { Userservice} from '../../services/user.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  user: User;
  error: boolean;
  

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
      this.error = false;
    },error => {
      this.error = true; 
    })
  }

  update(){
    if(this.user.password.length > 0){
      this.userService.putUser(this.user)
      .subscribe((response)=>{
        console.log(response);
      })
    }
  }

  delete(){
    this.userService.deleteUser(this.user)
    .subscribe((response) =>{
      console.log(response);
      if (response === 1 || response === "1"){
        this.userService.deconnectionUser();
        this.router.navigate(['/auth/signin']);
      }
    })
  }

}
