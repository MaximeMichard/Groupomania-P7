import { Component, OnInit } from '@angular/core';
import { Postservice } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { HttpClient} from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {

  error: boolean;
  post: Post;
  event: any;

  constructor(private postService: Postservice,
              private router : Router) {
                this.post = new Post();
               }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.post.title != null  && this.post.content && this.post.attachment != null){
      this.postService.postMessage(this.post).subscribe(response =>{
        console.log(response)
      },error =>{
        console.log(error.error)
        this.error= true;
      })
    }
    else{
      this.error= true
    }
  }

  onFileSelected(event){
    console.log(event);
  }

}
