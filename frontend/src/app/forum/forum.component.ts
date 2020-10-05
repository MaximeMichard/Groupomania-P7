import { Component, OnInit } from '@angular/core';
import { Userservice } from '../services/user.service';
import { Postservice } from '../services/post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { Alert } from '../models/alert.model';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

const ALERTS: Alert[] = [{
  type: 'success',
  message: 'Post Supprimé',
},{
  type: 'danger',
  message: 'This is a danger alert',
}
];

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  post: Post;
  posts: [];
  userId: number;
  alerts: Alert[];
  delete: boolean;

  constructor(private userService: Userservice,
              private postService: Postservice,
              private router: Router) {
    this.reset();
    this.post = new Post();
   }

  ngOnInit(): void {
    this.postService.getPost()
    .subscribe((response) =>{
    console.log(response);
     this.posts = response;   
    },(err)=>{
      console.log(err)
    })
    this.userId= this.userService.getSavedUser().userId;
  }

  deletePost(_post){
    this.postService.deletePost(_post)
    .subscribe((response)=>{
      this.delete = false ;
      setTimeout(function(){
        location.reload(); 
      },3000);
    },(err)=>{
      this.router.navigate(['/not-found']);
      this.delete = true;
    })
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
  reset() {
    this.alerts = Array.from(ALERTS);
  }

}
