import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: string = '';
  menuName: string = 'Log In';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateMenuName();
      }
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((authState) => {
      this.isLoggedIn = authState.isLoggedIn;
      this.userRole = authState.role;
      this.updateMenuName();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  updateMenuName(): void {
    if (this.isLoggedIn) {
      this.menuName = 'Log out';
    } else {
      this.menuName = 'Log In';
    }
  }
}
