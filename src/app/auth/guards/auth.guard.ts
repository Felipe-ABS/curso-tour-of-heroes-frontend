import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}

  canActivate(): boolean { // Serve para que possa ser verificado nos routing modules se a rota pode ser ativada, caso não possa ser ativada podemos fazer algo para barrar a ação
    this.authService.updateLoggedIn();
    if(localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
