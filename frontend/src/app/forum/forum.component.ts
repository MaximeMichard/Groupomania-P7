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

  title:string;

  posts: any[];

  constructor(private userService: Userservice,
              private postService: Postservice) { }

  ngOnInit(): void {
    this.postService.getPost()
    .subscribe((response) =>{
      console.log(response);
    })
  }

}
