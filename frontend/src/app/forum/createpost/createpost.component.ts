import { Component, OnInit } from '@angular/core';
import { Postservice } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

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
        Swal.fire({
          title: 'Post créer !',
          text: 'Vous allez être redigérer !',
          icon: 'success',
          timer: 3000
        });
       setTimeout(()=>{
        if(this.router.url.startsWith("/forum") == true){
          location.reload();
        }
        else{
          this.router.navigate(['/forum']);
          setTimeout(()=>
          location.reload()
          ,2000)
        }
       },3000);        
      },(error) =>{
        Swal.fire('Error !', 'Un problème est survenu lors de votre requête ! ', 'error');
        return error;
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
