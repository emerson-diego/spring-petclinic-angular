import { Component, OnInit } from "@angular/core";
import { Usuario } from "../user/usuario";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user: Usuario;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => (this.user = user));
  }

  logout() {
    this.userService.logout();
    this.router.navigate(["login"]);
  }
}
