import { AppComponent } from './../app.component';
import { Password } from './../_models/password';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './../_services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';
import { ErroRegistro } from '../_models/erro-registro';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user: User;

  loginForm: FormGroup;
  myFormModal: FormGroup;
  myFormModalPsw: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  erros: ErroRegistro[] = [];

  passwordLocal: string = null;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(

    private app: AppComponent,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,

  ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  ngOnInit() {

      //localStorage.removeItem('currentUser');
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

    this.loading = true;
    this.submitted = true;
    this.passwordLocal = password;

    this.authenticationService.login(username, password)
        .pipe(first())
            .subscribe(
            data => {
                this.user = data;
                if(this.user.primeiroAcesso){
                  this.open('customModal2');
                  this.loading = false;
                }else{
                  this.router.navigate([this.returnUrl]);
                }
            },
            err => {
              this.loading = false;
              this.open("customModal1");
              this.erros = err['erros'];
            });
  }

  alterarSenha(password: Password){

    this.loading = true;

    this.authenticationService.alterarSenha(this.authenticationService.currentUserValue.id, password)
    .pipe(first())
        .subscribe(
        data => {
            this.loading = false;
            this.loggedIn.next(false);
            this.close('customModal2');
            this.app.logout();
        },
        err => {
          this.erros = err['erros'];
          this.loading = false;
          this.loggedIn.next(false);
        });

  }

  open(id: string) {
    this.erros = null;
    $('#' + id).modal('show');
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
