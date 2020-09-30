import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../services/user.service';
import { Postservice } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;

  constructor(private userService: Userservice,
              private postService: Postservice) {
    this.post = new Post();
   }

  ngOnInit(): void {
    this.postService.getPost()
    .subscribe((response) =>{
      console.log(response);
      this.post.title = response[0].title;
      this.post.createdAt = response[0].createdAt;
      this.post.id = response[0].userId;
      this.post.content = response[0].content;
      this.post.attachment= response [0].attachment;
    })
  }

  lastUpdate = new Promise((resolve,reject)=>{
    const date= new Date();
    setTimeout(()=>{
      resolve(date);
    },2000)
  });

}
