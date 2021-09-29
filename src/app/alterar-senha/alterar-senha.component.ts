import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppComponent } from '..';
import { Password } from '../_models/password';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

declare var $: any;

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html'
})
export class AlterarSenhaComponent implements OnInit {

  user: User;

  acao: string;
  loginForm: FormGroup;
  myFormModal: FormGroup;
  myFormModalPsw: FormGroup;

  loading = false;
  submitted = false;
  returnUrl: string;
  error;

  passwordLocal: string = null;

  private loggedIn = new BehaviorSubject<boolean>(false);
  currentUser: User;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private app: AppComponent,
      private authenticationService: AuthenticationService,
  ) {}

  ngOnInit(): void {

    this.acao = this.route.snapshot.paramMap.get('acao');
    if(this.acao === 'alterar')
      this.open('customModal2');

  }

  alterarSenha(password: Password){

    this.error = null;
    this.loading = true;

    this.authenticationService.alterarSenha(Number(localStorage.getItem('idUsuario')), password)
    .pipe(first())
        .subscribe(
        data => {
            this.loading = false;
            this.loggedIn.next(false);
            this.close('customModal2');
            this.app.logout();
        },
        error => {
          this.error = error;
          this.loading = false;
          this.loggedIn.next(false);
        });

  }

  open(id: string) {
    this.error = null;
    $('#' + id).modal('show');
  }

  close(id: string) {
    $('#' + id).modal('hide');
    this.router.navigate(['/']);
  }

}
