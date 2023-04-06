import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  subscription?: Subscription;

  constructor( private tokenService: TokenService, private router: Router) {
    this.subscription = this.tokenService.logged$.subscribe({
      next: (estaLogueado) => this.isLogged = estaLogueado
    })
   }

  ngOnInit(): void {
    this.tokenService.isLogged();
  }

  onLogOut() {
    this.tokenService.logOut();
    this.router.navigate(['/']);
  }

}
