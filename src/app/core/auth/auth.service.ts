import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { UserService } from "../user/user.service";

import { Config } from "../session/config";
import { environment } from "environments/environment";
import { ConfigService } from "../session/config.service";

const apiURL = `${environment.apiHost}/auth`;

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private userService: UserService
  ) {}

  authenticate(userName: string, password: string): Observable<any> {
    return this.http
      .post(apiURL, { email: userName, senha: password })
      .pipe(
        tap(res => {
          const authToken = res["token"];
          this.userService.setToken(authToken);

          // Set config
          //const config: Config = {
          //pdticId: res["pdtic_id"],
          //backlogId: res["backlog_id"],
          //priorizacaoHabilitada: res["priorizacao_habilitada"]
          //};
          //this.configService.setConfig(config);
        })
      )
      .pipe(catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      if (error.status == 404) {
        errorMessage = "Nenhum registro encontrado.";
      } else if (error.status == 401) {
        errorMessage = "Acesso não autorizado.";
      } else {
        errorMessage = error.message;
      }
    }
    return throwError(errorMessage);
  }
}
