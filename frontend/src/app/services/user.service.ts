import { User } from "../models/user.model";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { urlApi } from '../config';

@Injectable()

export class Userservice{

    id : any;
    headers : HttpHeaders;

     constructor(private HttpClient: HttpClient){
         if(this.getSavedUser() != null){
            let token = this.getSavedUser().token;
            this.headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': `Token ${token}`});
        }
     }

     ngOnInit(): void {
    }

    postUser(newUser: User){
         return this.HttpClient.post<any>( urlApi + '/auth/signup/', newUser);
    }

    loginUser(loginUser:User){
        return this.HttpClient.post<any>( urlApi + '/auth/login/', loginUser);
    }

    getUser(user){
        return this.HttpClient.get<any>( urlApi + '/auth/users/' + user.id , { headers : this.headers});
    }
    
    putUser(user){
        return this.HttpClient.put<any>( urlApi + '/auth/users/' + user.id, {"newPassword" : user.password }, { headers : this.headers});
    }

    deleteUser(user){
        return this.HttpClient.delete<any>( urlApi + '/auth/users/' + user.id , { headers : this.headers} );
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

    //Fonction qui permet la déconnection avec la suppression du local storage (avec une redirection) par la suite//
    deconnectionUser(){
        localStorage.clear(); 
    }

}