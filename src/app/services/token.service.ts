import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private logged = new BehaviorSubject<boolean>(false);
  public logged$: Observable<boolean> = this.logged;

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public isLogged(): void {
    let isLogged;
    if (this.getToken()) {
      isLogged = true;
    } else {
      isLogged = false;
    }
    this.logged.next(isLogged);
  }

  public logOut(): void {
    window.sessionStorage.clear();
    this.isLogged();
  }
}
