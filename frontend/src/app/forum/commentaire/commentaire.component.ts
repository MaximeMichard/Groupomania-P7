import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { Postservice } from '../../services/post.service';
import { Userservice } from '../../services/user.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';
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
              private route : ActivatedRoute) { 
                this.commentaire = new Commentaire();
              }

  ngOnInit(): void {
     
  }

}
