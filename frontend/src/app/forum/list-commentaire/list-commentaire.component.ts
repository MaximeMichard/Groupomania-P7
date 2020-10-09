import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { Postservice } from '../../services/post.service';
import { Userservice } from '../../services/user.service';
import { Commentaireservice } from '../../services/commentaire.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-commentaire',
  templateUrl: './list-commentaire.component.html',
  styleUrls: ['./list-commentaire.component.scss']
})
export class ListCommentaireComponent implements OnInit {

  userId: number;
  commentaires: [] ;


  commentaire: Commentaire;

  constructor(private userService : Userservice,
              private postService : Postservice,
              private commentaireService : Commentaireservice,
              private router: Router,
              private route : ActivatedRoute) {
                this.userId = this.userService.getSavedUser().userId;
               }

  

  ngOnInit(): void {

    const postId = this.route.snapshot.paramMap.get('id');

    this.commentaireService.getCommentaire(postId)
    .subscribe((response)=>{
      this.commentaires = response.commentaires;
     },(err)=>{
      console.log(err);
    })
  }

  deleteCommentaire(commentaire){
    
    this.commentaireService.deleteCommentaire(commentaire.id)
    .subscribe((response)=>{
      Swal.fire({
        title:'Commentaire supprimé !',
        icon:'warning'
      })
      setTimeout(()=>
      location.reload()
      ,3000)
      
    },(error)=>{
      Swal.fire({
        title:'Suppression impossible !' + error ,
        icon:'warning'
      })
    })
  }

}
