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
  fileToUpload: File = null;

  constructor(private postService: Postservice,
              private router : Router) {
                this.post = new Post();
               }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.post.title != null  && this.post.content  != null){
      this.postService.postMessage(this.post, this.fileToUpload).subscribe(response =>{
        this.router.navigate(['/forum']);
        this.error = false ;
        console.log(response);
      },error =>{
        this.error= true;
      })
    }
    else{
      this.error= true
    }
  }

  onFileSelected(files){
    this.fileToUpload = files[0];
  }

}
