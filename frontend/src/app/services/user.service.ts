import { User } from "../models/user.model";
import { Subject} from "rxjs/Subject";
import { HttpClient,HttpParams,HttpHeaders,HttpRequest} from '@angular/common/http';
import{ Observable, throwError} from 'rxjs';
import { catchError,retry} from 'rxjs/operators';
import { Injectable} from'@angular/core';

@Injectable()

export class Userservice{

     constructor(private HttpClient: HttpClient){}

     ngOnInit(): void {
    }

    postUser(newUser: User){
         return this.HttpClient.post<any>('http://localhost:3000/api/auth/signup/', newUser);
    }

    loginUser(loginUser:User){
        return this.HttpClient.post<any>('http://localhost:3000/api/auth/login/', loginUser);
    }

    getUser(id){
        let params = new HttpParams().set('?','?')
        let headers = new HttpHeaders().set('Authorization','?')
        return this.HttpClient.get<any>('http://localhost:3000/api/auth/users/' + id , {params});
    }

    getTest(){
        return this.HttpClient.get<any>("https://jsonplaceholder.typicode.com/todos/");
    }

    putUser(id ,newUser:User){
        return this.HttpClient.put<any>('http://localhost:3000/api/auth/users/' + id, newUser);
    }

    deleteUser(id){
        return this.HttpClient.delete<any>('http://localhost:3000/api/auth/users/' + id);
    }

    //Fonction qui permet de sauvegarder les infos du user connecter (id,token) dans le local storage // 
    saveUser(user:any){
        localStorage.setItem('groupomania_user', JSON.stringify(user));
    }

    //Fonction qui permet de recupérer les infos du user connecter // 
    getSavedUser(){
        let user = localStorage.getItem('groupomania_user');
        return JSON.parse(user) || null; 
    }

    deconnectionUser(){
        localStorage.clear(); 
    }

}