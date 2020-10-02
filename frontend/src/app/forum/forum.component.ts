import { Component, OnInit } from '@angular/core';
import { Userservice } from '../services/user.service';
import { Postservice } from '../services/post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  post: Post;
  posts: [];
  userId: number;
  delete: boolean;

  constructor(private userService: Userservice,
              private postService: Postservice) {

    this.post = new Post();

    this.userId= this.userService.getSavedUser().userId;
      

   }

  ngOnInit(): void {
    this.postService.getPost()
    .subscribe((response) =>{
    console.log(response);
     this.posts = response;   
    },(err)=>{
      console.log(err)
    })
  }

 /*  deletePost(){
    
    if(this.userId != this.post.userId){
      
      this.postService.deletePost()
      .subscribe((response) => {
        console.log(response);
      })
    }
  } */


  
  
}
