import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Userservice} from '../../services/user.service';
import{ HttpParams } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  user: User;
  id: any;
  username: any;
  email:any;

  constructor(private userService: Userservice) { 
     this.user= new User();
  }

  ngOnInit(): void {
  }

  infoUser(){
    this.id= this.userService.getSavedUser();
    console.log(this.id.userId);
    this.userService.getUser(this.id.userId)
    .subscribe((response)=>{
      console.log(response.username);
      this.username = response.username;
      this.email=response.email;
    })
  }
 
  updateUser(){
    
  }

}
