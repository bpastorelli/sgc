import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from './../_services/authentication.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

  ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/home']);
        }
  }

  ngOnInit() {
      localStorage.removeItem('currentUser');
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logar(username: string, password: string) {

    this.submitted = true;

    // stop here if form is invalid
    //if (this.loginForm.invalid) {
    //    return;
    //}

    this.loading = true;
    this.authenticationService.login(username, password)
        .subscribe(
            data => {
                this.loggedIn.next(true);
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  logout() {
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
  }

}
