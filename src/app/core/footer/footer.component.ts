import { Component, OnInit } from "@angular/core";
import { Usuario } from "../user/usuario";
import { UserService } from "../user/user.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  user: Usuario;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => (this.user = user));
  }
}
