import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
//import { TokenService } from '../core/token/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if (this.tokenService.hasToken()) {

    let token =
      "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgZG8gRsOzcnVtIGRhIEFsdXJhIiwic3ViIjoiMSIsImlhdCI6MTU4NTE4NTI5NywiZXhwIjoxNTg1MjcxNjk3fQ.ZvgVjw2yH9Sd-s26XDjui1WX2XqV8uI3M71aXeIXZIk";

    // request = request.clone({
    //   headers: request.headers.set("Authorization", "Bearer " + token)
    // });

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUEkgZG8gRsOzcnVtIGRhIEFsdXJhIiwic3ViIjoiMSIsImlhdCI6MTU4NTE4NTI5NywiZXhwIjoxNTg1MjcxNjk3fQ.ZvgVjw2yH9Sd-s26XDjui1WX2XqV8uI3M71aXeIXZIk`
      }
    });
    // }
    console.log(request.headers);
    return next.handle(request);
  }
}
