import { AppComponent } from './../app.component';
import { Password } from './../_models/password';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../_modal';
import { AuthenticationService } from './../_services/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../_models/user';

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
  error;

  passwordLocal: string = null;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(

    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private modalService: ModalService,
    private app: AppComponent,

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
            error => {
              this.loading = false;
              this.open("customModal1");
              this.error = error;
            });
  }

  alterarSenha(password: Password){

    this.loading = true;

    this.authenticationService.alterarSenha(this.authenticationService.currentUserValue.id, password)
    .pipe(first())
        .subscribe(
        data => {
            this.loading = false;
            this.close('customModal2');
            this.loggedIn.next(false);
            this.app.logout();
        },
        error => {
          this.loading = false;
          this.error = error;
        });

  }

  logout() {
      this.loggedIn.next(false);
      this.router.navigate(['/']);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  open(id: string) {
    this.error = null;
    $('#' + id).modal('show');
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
