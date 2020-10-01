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

    getCommentaire(){
        return this.HttpClient.get<any> (urlApi + /* post.id, */ '/commentaire', {headers: this.headers});
    }
}