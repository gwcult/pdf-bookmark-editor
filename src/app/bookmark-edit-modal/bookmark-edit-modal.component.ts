import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BookmarkItem } from '../pdf-bookmark.model';

@Component({
  selector: 'app-bookmark-edit-modal',
  templateUrl: './bookmark-edit-modal.component.html',
  styleUrls: ['./bookmark-edit-modal.component.scss']
})
export class BookmarkEditModalComponent implements OnInit {
  form: FormGroup = this.createForm();
  editMode = false;

  constructor(public modal: NgbActiveModal, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  edit(item: BookmarkItem) {
    this.form.reset(item);
    this.editMode = true;
  }

  create() {
    this.form.reset();
    this.editMode = false;
  }

  submit() {
    if (this.form.valid) {
      this.modal.close(this.form.value);
    }
  }

  createForm() {
    return this.fb.group({
      title: ['', Validators.minLength(1)],
      page: [null, Validators.min(1)],
    });
  }
}
