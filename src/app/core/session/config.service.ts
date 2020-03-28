import { Injectable } from "@angular/core";
import { Config } from "./config";
import { BehaviorSubject, Observable } from "rxjs";

const KEY = "config";

@Injectable({ providedIn: "root" })
export class ConfigService {
  private currentConfigSubject: BehaviorSubject<Config>;

  constructor() {
    this.currentConfigSubject = new BehaviorSubject<Config>(
      JSON.parse(window.sessionStorage.getItem(KEY))
    );
  }

  getConfig(): Observable<Config> {
    return this.currentConfigSubject.asObservable();
  }

  hasConfig(): boolean {
    return window.sessionStorage.getItem(KEY) != null;
  }

  setConfig(config: Config): void {
    window.sessionStorage.setItem(KEY, JSON.stringify(config));
    this.currentConfigSubject.next(config);
  }

  removeConfig(): void {
    window.sessionStorage.removeItem(KEY);
    this.currentConfigSubject.next(null);
  }
}
