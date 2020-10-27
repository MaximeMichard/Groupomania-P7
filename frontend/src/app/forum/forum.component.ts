import { Component, OnInit } from '@angular/core';
import { Userservice } from '../services/user.service';
import { Postservice } from '../services/post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  post: Post;
  user: User;
  posts: [];
  userId: number;
  delete: boolean;
  

  constructor(private userService: Userservice,
              private postService: Postservice,
              private router: Router) {

    this.user = new User();
    this.user.id = this.userService.getSavedUser().userId;
    this.user.token = this.userService.getSavedUser().token;
    this.user.isAdmin = this.userService.getSavedUser().isAdmin;

    this.post = new Post();
   }

  ngOnInit(): void {
    this.postService.getPost()
    .subscribe((response) =>{
     this.posts = response;   
    },(err)=>{
      return err; 
    })
    this.userId= this.userService.getSavedUser().userId;
  }

  deletePost(_post){
    this.postService.deletePost(_post)
    .subscribe((response)=>{
      Swal.fire(
        'Supprimé!',
        'Post Supprimé !',
        'warning'
      )
      setTimeout(function(){
        location.reload(); 
      },2000);
    },(err)=>{
      this.router.navigate(['/not-found']);
      this.delete = true;
    })
  }

}
