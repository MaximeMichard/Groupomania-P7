import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { Postservice } from '../../services/post.service';
import { Userservice } from '../../services/user.service';
import { Commentaireservice } from '../../services/commentaire.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {

  userId: number;
  commentaire : Commentaire;

  constructor(private userService : Userservice,
              private postService : Postservice,
              private router: Router,
              private route : ActivatedRoute,
              private commentaireService : Commentaireservice) { 
                this.commentaire = new Commentaire();
              }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    this.commentaire.postId = this.route.snapshot.paramMap.get('id');
    console.log(this.commentaire.postId);
    this.commentaireService.postCommentaire(this.commentaire).subscribe(response =>{
        console.log(response);
      },(error) =>{ 
        console.log(error);
      })
    }

 

}
