import { Commentaire} from '../models/commentaire.model';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable} from'@angular/core';
import { Userservice } from '../services/user.service';
import { urlApi } from '../config';
import { User } from '../models/user.model';

@Injectable()

export class Commentaireservice{
    token: string;
    headers: HttpHeaders;

    constructor(private HttpClient: HttpClient,
                private userService: Userservice)
    {
        if(this.userService.getSavedUser() != null)
        {
            this.token = this.userService.getSavedUser().token;
            this.headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': `Token ${this.token}`});
        }
    }

    getCommentaire(idPost){
        return this.HttpClient.get<any> (urlApi + '/post/' + idPost + '/commentaire', {headers: this.headers});
    }

    postCommentaire(newCommentaire: Commentaire){
        return this.HttpClient.post<any>( urlApi + '/commentaire/', newCommentaire, {headers: this.headers})
    }

    deleteCommentaire ( idCommentaire ) {
        return this.HttpClient.delete<any> ( urlApi + '/commentaire/' + idCommentaire, {headers: this.headers});
    }
}