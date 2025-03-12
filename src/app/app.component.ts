import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser: User;
  primeiroAcesso: boolean = false;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.router.navigate([''])
      this.router.get('/', function(req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
      res.setHeader('Access-Control-Allow-Credentials', true); // If needed
  
      res.send('cors problem fixed:)');
    });
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
