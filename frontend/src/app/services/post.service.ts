import { Post } from "../models/post.model";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable} from'@angular/core';
import { Userservice } from './user.service'; 
import { urlApi } from '../config';
import { formatDate } from '@angular/common';

@Injectable()

export class Postservice{

    headers : HttpHeaders;
    token: string;
    userId: number;

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
        this.headers = new HttpHeaders({'Authorization': `Token ${this.token}` }) ; 
        return this.HttpClient.post<any>( urlApi + '/post/',  formData, { headers : this.headers } );
    }

    getPost(){
        return this.HttpClient.get<any>(urlApi + '/post/',{ headers : this.headers});
    }

    getOnePost(id){
        return this.HttpClient.get<any>(urlApi + '/post/' + id, {headers: this.headers} );
    }

    deletePost(post){
        return this.HttpClient.delete<any> (urlApi + '/post/' + post.id, {headers : this.headers })
    }

    updatePost(newPost:Post, file: File){
        const formData = new FormData();
        formData.append('post',JSON.stringify(newPost));
        formData.append('file', file);
        this.headers = new HttpHeaders({'Authorization': `Token ${this.token}` }); 
        return this.HttpClient.put<any>(urlApi + '/post/' + newPost.id, formData, { headers: this.headers});
    }
}