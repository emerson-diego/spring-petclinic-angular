import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "app/core/auth/auth.service";
import { UserService } from "app/core/user/user.service";
import { TokenService } from 'app/core/token/token.service';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      if (user && this.tokenService.naoExpirado()) {
        //e o token ainda for válido
        this.router.navigate(["welcome"]);
      }
    });

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      senha: ["", Validators.required]
    });
  }

  login(): void {
    const email = this.loginForm.get("email").value;
    const senha = this.loginForm.get("senha").value;

    this.authService.authenticate(email, senha).subscribe(
      () => {
        this.router.navigate(["welcome"]);
      },
      err => {
        console.log(err);
        this.loginForm.reset();
        alert("Usuário ou senha inválido");
      }
    );
  }
}
