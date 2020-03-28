import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Usuario } from "../user/usuario";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  private usuario: Usuario;

  constructor(private userService: UserService) {
    this.userService.getUser().subscribe(usuario => (this.usuario = usuario));
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.usuario) {
      //&& this.usuario.eAdmin) {
      return true;
    }
    return false;
  }
}
