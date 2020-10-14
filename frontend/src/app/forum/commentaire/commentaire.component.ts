import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { Postservice } from '../../services/post.service';
import { Userservice } from '../../services/user.service';
import { Commentaireservice } from '../../services/commentaire.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';

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
    this.commentaire.postId = this.route.snapshot.paramMap.get('id');
  }

  onSubmit(form:NgForm){
    this.commentaireService.postCommentaire(this.commentaire).subscribe(response =>{
      Swal.fire({
        title:'Ouii !',
        text: 'Commentaire ajouter',
        icon: 'success',
        timer: 3000
      })
      setTimeout(()=>
      location.reload()
      ,3000)
        
      },(error) =>{ 
        Swal.fire({
          title:'Ouppsss..',
          text:'Error ...',
          icon:'error'
        })
      })
    }
}
