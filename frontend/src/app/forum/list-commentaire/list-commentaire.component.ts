import { Component, OnInit } from '@angular/core';
import { Commentaire } from '../../models/commentaire.model';
import { Postservice } from '../../services/post.service';
import { Userservice } from '../../services/user.service';
import { Router,ActivatedRoute,ParamMap } from '@angular/router';

@Component({
  selector: 'app-list-commentaire',
  templateUrl: './list-commentaire.component.html',
  styleUrls: ['./list-commentaire.component.scss']
})
export class ListCommentaireComponent implements OnInit {

  userId: number;

  commentaire: Commentaire;

  constructor(private userService : Userservice,
              private postService : Postservice,
              private router: Router,
              private route : ActivatedRoute) {
                /* this.commentaire = new Commentaire(); */
               }

  ngOnInit(): void {
    const commentaireId= this.route.snapshot.paramMap.get('id');
    this.postService.getOnePost(commentaireId)
    .subscribe((response)=>{
      if (response != null){
        this.userId= this.userService.getSavedUser().userId;
        if(this.userId != response.userId){
          this.router.navigate(['/forum']);
        }
        else{
          this.commentaire = response;
        }
      }
      else{
        this.router.navigate(['/forum']);
      }
    },(err)=>{
      console.log(err);
    })
  }

}
