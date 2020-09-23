import { User } from "../models/user.model";
import { Subject} from "rxjs/Subject";
import { HttpClient,HttpParams,HttpHeaders,HttpRequest} from '@angular/common/http';
import{ Observable, throwError} from 'rxjs';
import { catchError,retry} from 'rxjs/operators';
import { Injectable} from'@angular/core';
import { convertPropertyBindingBuiltins } from '@angular/compiler/src/compiler_util/expression_converter';

@Injectable()

export class Userservice{


     constructor(private HttpClient: HttpClient){}

     ngOnInit(): void {
    }

    postUser(newUser: User){
         return this.HttpClient.post<any>('http://localhost:3000/api/auth/signup/', newUser);
    }

    loginUser(loginUser:User){
        return this.HttpClient.post<any>('http://localhost:3000/api/auth/login/', loginUser)
    }

    getUser(){
        return this.HttpClient.get<any>('http://localhost:3000/api/auth/users/'+ '')
    }
    putUser(newUser:User){
        return this.HttpClient.put<any>('http://localhost:3000/api/auth/users/', newUser)
    }
    deleteUser(){
        return this.HttpClient.delete<any>('http://localhost:3000/api/auth/users/' + '')
    }

}