import{ CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import { Observable} from "rxjs";
import { Injectable } from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable()

export class AuthGuard implements CanActivate{
constructor(private authService: AuthService, private router: Router){

}
    canActivate(
        route:ActivatedRouteSnapshot,
        state:RouterStateSnapshot
    ):Observable<boolean> | Promise<boolean> | boolean{
        if(this.authService.isAuth){
            return true;
        }else{
            this.router.navigate(['/auth']);
        }
    }
}