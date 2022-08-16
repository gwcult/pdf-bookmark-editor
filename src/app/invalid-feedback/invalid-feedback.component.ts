import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

interface Errors {
  min?: any,
  max?: any,
  required?: any,
}

@Component({
  selector: 'app-invalid-feedback',
  templateUrl: './invalid-feedback.component.html',
  styleUrls: ['./invalid-feedback.component.scss']
})
export class InvalidFeedbackComponent implements OnInit {
  @Input() name!: string;

  constructor(private formGroupDirective: FormGroupDirective) { }

  ngOnInit(): void {
  }

  get form() {
    return this.formGroupDirective.form.get(this.name) as FormGroup;
  }

  get errors(): Errors {
    return this.formGroupDirective.form.get(this.name)?.errors || {} as Errors;
  }
}
