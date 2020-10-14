import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { Postservice } from '../../services/post.service';
import { Userservice } from '../../services/user.service';
import { Commentaireservice } from '../../services/commentaire.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
import { User } from '../../models/user.model'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-commentaire',
  templateUrl: './list-commentaire.component.html',
  styleUrls: ['./list-commentaire.component.scss']
})
export class ListCommentaireComponent implements OnInit {

  userId: number;
  commentaires: [] ;
  user: User;


  commentaire: Commentaire;

  constructor(private userService : Userservice,
              private commentaireService : Commentaireservice,
              private router: Router,
              private route : ActivatedRoute) {

                this.user = new User();

                this.userId = this.userService.getSavedUser().userId;
                this.user.isAdmin = this.userService.getSavedUser().isAdmin;
                
               }

  

  ngOnInit(): void {

    const postId = this.route.snapshot.paramMap.get('id');

    this.commentaireService.getCommentaire(postId)
    .subscribe((response)=>{
      this.commentaires = response.commentaires;
      console.log(response);
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
        title:'Suppression impossible !' + JSON.parse (error) ,
        icon:'warning'
      })
    })
  }

}
