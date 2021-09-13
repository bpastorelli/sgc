import { ImportarContribuicoesService } from './importar-contribuicoes.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Contribuicao } from '../contribuicao.model';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-importar-contribuicoes',
  templateUrl: './importar-contribuicoes.component.html'
})
export class ImportarContribuicoesComponent implements OnInit {

  pag: Number = 1;
  contador: Number = 10;

  loading: boolean = false;

  error;
  errorMessage;
  errorsList: string[] = [];
  uploadForm: FormGroup;
  contribuicoes: Contribuicao[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private importarContribuicao: ImportarContribuicoesService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    if(this.authenticationService.currentUserValue){
       this.uploadForm = this.formBuilder.group({
          profile: ['']
       });
    }else{
        this.router.navigate(['/login']);
    }
  }

  onFileSelect(event){

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }

  }

  onSubmit(){

    this.loading = true;
    this.errorsList = [];
    this.contribuicoes = [];

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.importarContribuicao.postImportacao(formData)
      .subscribe(data =>{
          this.loading = false;
          this.contribuicoes = data;
        }, err=>{
          this.loading = false;
          this.errorMessage = err;
          this.errorsList = this.errorMessage;
        }
      );

      return this.contribuicoes;

  }

  pageChanged(event){
    this.pag = event;
  }

  formatId (n, len) {
    var num = parseInt(n, 10);
    len = parseInt(len, 10);
    return (isNaN(num) || isNaN(len)) ? n : ( 1e10 + "" + num ).slice(-len);
  }

  formatCPF(cpf: string){

    var p1 = cpf.substring(0,3)
    var p2 = cpf.substring(6,3)
    var p3 = cpf.substring(9,6)
    var p4 = cpf.substring(11,9)

    return p1+"."+p2+"."+p3+"-"+p4

  }

  cancelar(){

    this.router.navigate(['/'])

  }

  open(id: string) {
    this.error = null;
    $('#' + id).modal('show');
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
