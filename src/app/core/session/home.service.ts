import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Home } from "./home";

const KEY = "home";

@Injectable({ providedIn: "root" })
export class HomeService {
  private currenthomeSubject: BehaviorSubject<Home>;

  constructor() {
    this.currenthomeSubject = new BehaviorSubject<Home>(
      JSON.parse(window.sessionStorage.getItem(KEY))
    );
  }

  getConfig(): Observable<Home> {
    return this.currenthomeSubject.asObservable();
  }

  hasConfig(): boolean {
    return window.sessionStorage.getItem(KEY) != null;
  }

  setConfig(config: Home): void {
    window.sessionStorage.setItem(KEY, JSON.stringify(config));
    this.currenthomeSubject.next(config);
  }

  removeConfig(): void {
    window.sessionStorage.removeItem(KEY);
    this.currenthomeSubject.next(null);
  }
}
