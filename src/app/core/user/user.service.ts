import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import * as jtw_decode from "jwt-decode";
import { TokenService } from "../token/token.service";

import { UserToken } from "./userToken";
import { ConfigService } from "../session/config.service";
import { HomeService } from "../session/home.service";
import { Usuario } from "./usuario";

enum Papel {
  ADMIN = "ADMIN",
  GESTOR = "GESTOR"
}

@Injectable({ providedIn: "root" })
export class UserService {
  private userSubject = new BehaviorSubject<Usuario>(null);

  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
    private homeService: HomeService
  ) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    const userToken = jtw_decode(token) as UserToken;

    if (userToken) {
      const user: Usuario = {
        email: userToken.sub
        //login: userToken.sub,
        //eAdmin: userToken.papel[0] == Papel.ADMIN,
        //eGestor: userToken.papel[0] == Papel.GESTOR,
        //setor: userToken.setor ? userToken.setor[0] : null
      };
      this.userSubject.next(user);
    }
  }

  logout() {
    this.tokenService.removeToken();
    this.configService.removeConfig();
    this.homeService.removeConfig();
    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }
}
