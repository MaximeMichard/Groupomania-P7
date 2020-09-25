import{ CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { Observable} from "rxjs";
import { Injectable } from "@angular/core";
import {Userservice} from "../services/user.service";

@Injectable()

export class AuthGuard implements CanActivate{
constructor(private userService: Userservice,
            private router: Router){

}
    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):Observable<boolean> | Promise<boolean> | boolean{
        if(this.userService.getSavedUser() != null){
            return true;
        }else{
            this.router.navigate(['/auth/signin']);
        }
    }
}