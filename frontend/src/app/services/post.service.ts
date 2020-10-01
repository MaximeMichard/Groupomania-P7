import { Post } from "../models/post.model";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable} from'@angular/core';
import { Userservice } from './user.service'; 
import { urlApi } from '../config';

@Injectable()

export class Postservice{

    headers : HttpHeaders;
    token: string;

     constructor(private HttpClient: HttpClient,
                private userService: Userservice){
         if(this.userService.getSavedUser() != null){
            this.token = this.userService.getSavedUser().token;
            this.headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': `Token ${this.token}`});
        }
     }

     ngOnInit(): void {
    }

    postMessage(newPost: Post, file : File){

        const formData = new FormData();
        formData.append('post', JSON.stringify(newPost));
        formData.append('file', file);
        formData.forEach(function(element){
            console.log(element);
          });
        this.headers = new HttpHeaders({'Authorization': `Token ${this.token}` }) ; 
        return this.HttpClient.post<any>( urlApi + '/post/',  formData, { headers : this.headers } );
    }

    getPost(){
        return this.HttpClient.get<any>(urlApi + '/post/',{ headers : this.headers})
    }

}