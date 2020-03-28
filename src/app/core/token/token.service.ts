import { Injectable } from "@angular/core";
import * as jtw_decode from "jwt-decode";
import { UserToken } from "../user/userToken";
import * as moment from "moment";

const KEY = "authToken";

@Injectable({ providedIn: "root" })
export class TokenService {
  naoExpirado() {
    console.log("Moment    :" + moment());
    console.log("Expiração :" + this.getExpiration());
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("exp");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  hasToken() {
    return !!this.getToken() && this.naoExpirado();
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);

    const userToken = jtw_decode(token) as UserToken;
    const expiresAt = userToken.exp.valueOf() * 1000;

    window.localStorage.setItem("exp", JSON.stringify(expiresAt.valueOf()));
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }
}
