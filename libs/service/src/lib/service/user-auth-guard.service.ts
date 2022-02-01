import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService implements CanActivate {

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = localStorage.getItem('token');
    if(token) {
      
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      
      if(!tokenDecode.isAdmin && !this._expired(tokenDecode.exp)){
        return true;
      }
    }
    this.router.navigate(['/UserLogin']);
    return false;   
  }

  private _expired(exp:number): boolean {
    return Math.floor(new Date().getTime()/1000)>=exp;
  }
}
