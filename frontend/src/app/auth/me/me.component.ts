import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Userservice} from '../../services/user.service';
import{ HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  id: any;

  constructor(private userService: Userservice) { }

  ngOnInit(): void {
  }
  infoUser(){
    this.userService.getSavedUser()
    this.userService.getUser(this.id)
    .subscribe((response)=>
    {
      console.log(response);
    })

    
  }

  

  
}
