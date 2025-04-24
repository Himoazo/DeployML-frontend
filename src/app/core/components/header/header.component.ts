import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../../features/Authentication/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  auth = inject(AuthService)
  router = inject(Router)
  mobileMenuOpen = false;

  ngOnInit() {
    this.auth.isLoggedIn().subscribe({});
  }

  logOut() {
    this.auth.logOut().subscribe({
      next: () => {
        console.log("Success")
        this.router.navigate(["/"]);
      },
      error: err => {
        console.log(err);
      }
    })
  }
}
