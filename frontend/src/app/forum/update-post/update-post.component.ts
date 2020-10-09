import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Postservice } from '../../services/post.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Userservice } from '../../services/user.service';
import { NgForm } from '@angular/forms';

import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {

  userId: number;
  post: Post;
  error: boolean;
  fileToUpload: File = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private postService: Postservice,
              private userService: Userservice) { 
                this.post = new Post ();
              }

  ngOnInit(): void {
    const postId= this.route.snapshot.paramMap.get('id');
    this.postService.getOnePost(postId)
    .subscribe((response)=>{
      if (response != null){
        this.userId= this.userService.getSavedUser().userId;
        if(this.userId != response.userId){
          this.router.navigate(['/forum']);
        }
        else{
          this.post = response;
        }
      }
      else{
        this.router.navigate(['/forum']);
      }
    },(err)=>{
      console.log(err);
    })  
  }

  onSubmit(form:NgForm){
    if(this.post.title != null  && this.post.content != null){
      this.postService.updatePost(this.post,this.fileToUpload).subscribe(response =>{
        if(response != null){
          Swal.fire({
            title:'Modifié!',
            text:'Post Modifié !',
            icon:'success',
            timer: 2000
          })
          setTimeout(this.navigateForum.bind(this),3000);      
        }
        else{
          this.error= true;
        }
      },error =>{
        console.log(error.error)
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

  navigateForum(){
    this.router.navigate(['/forum']);
  }

}
