import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-unathorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent implements OnInit {

  myFormModalPsw: FormGroup;

  constructor() { }

  ngOnInit(): void {

    this.open('exampleModal');

  }

  open(id: string) {
    $('#' + id).modal('show');
  }

  close(id: string) {
    $('#' + id).modal('hide');
  }

}
