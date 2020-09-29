import { Post } from "../models/post.model";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable} from'@angular/core';
import { Userservice } from './user.service'; 
import { urlApi } from '../config';

@Injectable()

export class Postservice{

    headers : HttpHeaders;
    id : any ;

     constructor(private HttpClient: HttpClient,
                private userService: Userservice){
         if(this.userService.getSavedUser() != null){
            let token = this.userService.getSavedUser().token;
            this.headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': `Token ${token}`});
        }
     }

     ngOnInit(): void {
    }

    postMessage(newPost: Post){
         return this.HttpClient.post<any>( urlApi + '/post/', newPost,{ headers : this.headers});
    }

    getPost(){
        return this.HttpClient.get<any>(urlApi + '/post/',{ headers : this.headers})
    }
}