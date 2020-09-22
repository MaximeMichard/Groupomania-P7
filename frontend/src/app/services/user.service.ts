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
        return this.HttpClient.post<any>('http://localhost:3000/api/auth/login/', loginUser)
    }

}